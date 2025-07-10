import { customerValidator, loginValidator, updateCustomerValidator } from "#validators/customerValidator";
import { HttpContext } from "@adonisjs/core/http";
import Customers from "#models/customerModel";
import hash from "@adonisjs/core/services/hash";
import { CustormerService } from "#services/custormer_service";


export default class CustomerController {

    async login({ request, response, auth }: HttpContext) {
        const { email, password } = await request.validateUsing(loginValidator)
        
        try {
            const customer = await Customers.verifyCredentials(email, password)
            const token = await auth.use('api').createToken(customer)

            
            return response.ok({
                token: token,
                type: 'bearer',
                expires_at: token.expiresAt
        })
        } catch (error) {
            return response.unauthorized({
                error: 'Identifiants invalides',
                message: 'Email ou mot de passe incorrect'
        })
        }
    }

    async logout({ request, response, auth }: HttpContext) {
        const { id } = request.params()
        const authenticatedUser = auth.user

        try {
            const customer = await Customers.findByOrFail('id', id)

            if (!authenticatedUser || authenticatedUser.id !== customer.id) {
                return response.forbidden({
                    error: 'Accès refusé',
                    message: 'Vous ne pouvez pas déconnecter un autre utilisateur'
                })
            }

            await auth.use('api').invalidateToken()
            return response.ok({
                message: 'Déconnexion réussie'
            })
        } catch (error) {
            return response.notFound({
                error: 'Utilisateur non trouvé',
                message: 'L\'utilisateur n\'existe pas'
            })
        }
    }

    async store({ request, response }: HttpContext) {
        const storeCustomer = await request.validateUsing(customerValidator)

        if (storeCustomer.role === 'Professionnel') {
        if (!storeCustomer.company.name || !storeCustomer.company.name.trim()) {
          return response.status(400).json({ message: 'company_name est obligatoire si role est Professionnel' });
        }
        if (!storeCustomer.company.siret || storeCustomer.company.siret.trim().length < 9 || storeCustomer.company.siret.trim().length > 14) {
          return response.status(400).json({ message: 'siret est obligatoire et doit faire entre 9 et 14 caractères si role est Professionnel' });
        }
      }
        const hashedPassword = await hash.make(storeCustomer.password)

        const newCustomer = await Customers.create({
            last_name: storeCustomer.last_name ?? '',
            first_name : storeCustomer.first_name ?? '',
            email : storeCustomer.email,
            phone : storeCustomer.phone ?? '',
            company_name : storeCustomer.company.name ?? '',
            siret : storeCustomer.company.siret ?? '',
            role : storeCustomer.role,
            address_line_1 : storeCustomer.address.line1 ?? '',
            address_line_2 : storeCustomer.address.line2 ?? '',
            postal_code : storeCustomer.address.postal_code ?? '',
            city : storeCustomer.address.city ?? '',
            country : storeCustomer.address.country ?? '',
            password : hashedPassword,

        })

        if (!response.ok){
            return response.status(400).json({message: 'User already exists'})
        } else {
            return response.status(201).created(newCustomer)
        }
    };

    async show({request, response, auth} : HttpContext){
        const {id} = request.params()
        const authenticatedUser = auth.user

        try {
            const customer = await Customers.findByOrFail('id', id)

            if (!authenticatedUser || authenticatedUser.id !== customer.id) {

                return response.forbidden({
                    error: 'Accès refusé',
                    message: 'Vous ne pouvez pas accéder aux données d\'un autre utilisateur'
                })
            }
            const enrichedCustomer = await CustormerService.loadExternalRelations(customer)

            return response.ok(enrichedCustomer)

        } catch {
            return response.status(404).json({message : 'L\'utilisateur n\'existe pas'})
        }
        
    };

    async update({request, response, auth} : HttpContext){
        const {id} = request.params()
        const authenticatedUser = auth.user

        try {
            const customer = await Customers.findByOrFail('id', id)

            if (!authenticatedUser || authenticatedUser.id !== customer.id) {

                return response.forbidden({
                    error: 'Accès refusé',
                    message: 'Vous ne pouvez pas modifier les données d\'un autre utilisateur'
                })
            }

            const updateCustomer = await request.validateUsing(updateCustomerValidator)
            customer.password = await hash.make(updateCustomer.password)
            await customer.save()

            return response.status(201).json(customer)

        } catch {
            return response.status(404).json({ message: 'L\'utilisateur n\'existe pas' })
        }
    };

    async destroy({request, response, auth} : HttpContext){
        const {id} = request.params()
        const authenticatedUser = auth.user

        try{
            const deleteCustomer = await Customers.findByOrFail('id', id)

            if (!authenticatedUser || authenticatedUser.id !== deleteCustomer.id) {
                return response.forbidden({
                    error: 'Accès refusé',
                    message: 'Vous ne pouvez pas supprimer le compte d\'un autre utilisateur'
                })
            }
            await deleteCustomer.delete()
            return response.status(204).json({ message: 'Votre compte a été supprimé avec succès !' })

        } catch {
            return response.status(404).json({ message: 'Ce compte n\'existe pas' })
        }
    }

    async index({response, auth} : HttpContext){

        const authenticatedUser = auth.user

        if (!authenticatedUser || authenticatedUser.role !== 'admin') {

            return response.forbidden({
            error: 'Accès refusé',
            message: 'Seuls les administrateurs peuvent accéder à la liste des utilisateurs'
            })
        }
        const customers = await Customers.all()

        return response.status(200).json({ data: customers })

    };
}
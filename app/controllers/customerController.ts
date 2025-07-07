import { customerValidator, updateCustomerValidator } from "#validators/customerValidator";
import { HttpContext } from "@adonisjs/core/http";
import Customers from "#models/customerModel";
import hash from "@adonisjs/core/services/hash";
import { CustormerService } from "#services/custormer_service";
//import { report } from "process";

export default class CustomerController {

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

    async show({request, response} : HttpContext){
        const {id} = request.params()

        try {
            const customer = await Customers.findByOrFail('id', id)
            const enrichedCustomer = await CustormerService.loadExternalRelations(customer)

            return response.ok(enrichedCustomer)

        } catch {
            return response.status(404).json({message : 'Customer does not exist'})
        }
        /*const customer = await Customers.findByOrFail('id', id)

        if (!response.ok){
            return response.status(400).json({message: 'User does not exist'})
        } else {
            return response.status(200).json(customer)
        }*/
    };

    async update({request, response} : HttpContext){
        const {id} = request.params()
        const customer = await Customers.findByOrFail('id', id)
        const updateCustomer = await request.validateUsing(updateCustomerValidator)
        customer.password = await hash.make(updateCustomer.password)
        await customer.save()

        if(!response.ok){
            return response.status(400).json({message: 'User does not exist'})
        } else {
            return response.status(200).json(customer)
        }
    };

    async destroy({request, response} : HttpContext){
        const {id} = request.params()
        const deleteCustomer = await Customers.findByOrFail('id', id)
        await deleteCustomer.delete()

        if (!response.ok){
            return response.status(400).json({message: 'User does not exist'})
        } else {
            return response.status(204).json({message : 'Customer deleted'})
        }
    };

    async index({response} : HttpContext){
        const customers = await Customers.all()

        if (!response.ok){
            return response.status(400).json({message: 'Error while fetching customers'})
        }
        return response.status(200).json({ data: customers })
    };
}
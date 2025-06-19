import { customerValidator, updateCustomerValidator } from "#validators/customerValidator";
import { HttpContext } from "@adonisjs/core/http";
import Customers from "#models/customerModel";
import hash from "@adonisjs/core/services/hash";

export default class CustomerController {

    async store({ request, response }: HttpContext) {
        const storeCustomer = await request.validateUsing(customerValidator)
        const hashedPassword = await hash.make(storeCustomer.password)

        const newCustomer = await Customers.create({
            last_name: storeCustomer.last_name,
            first_name : storeCustomer.first_name,
            email : storeCustomer.email,
            phone : storeCustomer.phone,
            company_name : storeCustomer.company_name,
            siret : storeCustomer.siret,
            role : storeCustomer.role,
            address_line_1 : storeCustomer.address_line_1,
            address_line_2 : storeCustomer.address_line_2,
            postal_code : storeCustomer.postal_code,
            city : storeCustomer.city,
            country : storeCustomer.country,
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
        const customer = await Customers.findByOrFail('id', id)

        if (!response.ok){
            return response.status(400).json({message: 'User does not exist'})
        } else {
            return response.status(200).json(customer)
        }
    };

    async update({request, response} : HttpContext){
        const {id} = request.params()
        const customer = await Customers.findByOrFail('id', id)
        const updateCustomer = await request.validateUsing(updateCustomerValidator)
        customer.password = updateCustomer.password
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
        return response.status(200).json(customers)
    };
}
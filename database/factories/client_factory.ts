import  Factory  from '@adonisjs/lucid/factories'
import Customers from "#models/customerModel";
import { faker } from '@faker-js/faker'
import hash from "@adonisjs/core/services/hash";

export const ClientFactory = Factory
  .define(Customers, async ({}) => {
    const rawPassword = faker.internet.password()
    return {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: await hash.make(rawPassword),
      phone: faker.phone.number(),
      company_name: faker.company.name(),
      siret: faker.string.numeric({ length: 9 }),
      role: 'Particulier',
      address_line1: faker.location.streetAddress(),
      address_line2: faker.location.secondaryAddress(),
      postal_code: faker.location.zipCode(),
      city: faker.location.city(),
      country: faker.location.country(),
      
    }
  })
  .build()
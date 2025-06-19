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
    }
  })
  .build()
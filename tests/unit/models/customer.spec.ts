import { test } from '@japa/runner'
import Customers from '#models/customerModel'
import Database from '@adonisjs/lucid/services/db'
import hash from '@adonisjs/core/services/hash'

test.group('Customer Model', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('peut créer un client', async ({ assert }) => {
    const customerData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      phone: '0123456789',
      company_name: 'Test Company',
      siret: '123456789',
      role: 'Particulier',
      address_line_1: '123 Test Street',
      address_line_2: 'Apt 4B',
      postal_code: '75000',
      city: 'Paris',
      country: 'France'
    }

    const customer = await Customers.create(customerData)
    assert.exists(customer.id)
    assert.equal(customer.email, customerData.email)
  })

  test('peut vérifier les credentials', async ({ assert }) => {
    const password = 'password123'
    const hashedPassword = await hash.make(password)
    const customerData = {
      first_name: 'Test',
      last_name: 'User',
      email: 'test@example.com',
      password: hashedPassword,
      phone: '0123456789',
      company_name: 'Test Company',
      siret: '123456789',
      role: 'Particulier',
      address_line_1: '123 Test Street',
      postal_code: '75000',
      city: 'Paris',
      country: 'France'
    }
    await Customers.create(customerData)
    
    const verified = await Customers.verifyCredentials(
      customerData.email,
      password
    )
    assert.exists(verified)
  })
})
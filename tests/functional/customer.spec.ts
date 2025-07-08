import { test } from '@japa/runner'
import Database from '@adonisjs/lucid/services/db'
import { ClientFactory } from '#database/factories/client_factory'
import assert from 'assert'
import { CustormerService } from '#services/custormer_service'
import { setupAxiosMock } from '#tests/helpers/axios-mock'

test.group('Customer API', (group) => {
  group.teardown(async () => {
    await Database.manager.closeAll()

    // Pour forcer l'arrêt du processus Node
    if (process.env.CI) {
      process.exit(0)
    }
  })

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    await Database.from('customers').delete()

    const { api } = setupAxiosMock()
    CustormerService.setHttpClient(api)

    return () => Database.rollbackGlobalTransaction()
  })

  test('peut lister tous les clients', async ({ client }) => {
    await ClientFactory.createMany(3)
    const response = await client.get('/payetonkawa/api/v1/customers')

    response.assertStatus(200)
    response.assertBodyContains({
      data: response.body().data
    })
    assert.equal(response.body().data.length, 3)
  })

  test('peut récupérer un client par son ID', async ({ client }) => {
    const customer = await ClientFactory.create()
    const response = await client.get(`/payetonkawa/api/v1/customer/${customer.id}`)

    response.assertStatus(200)
    response.assertBodyContains({
      id: customer.id,
      email: customer.email
    })
  })

  test('peut mettre à jour un client', async ({ client }) => {
    const customer = await ClientFactory.create()
    const response = await client.patch(`/payetonkawa/api/v1/updateCustomer/${customer.id}`).json({
      password: 'NewPassword123!'
    })

    response.assertStatus(201)
  })

  test('peut supprimer un client', async ({ client }) => {
    const customer = await ClientFactory.create()
    const response = await client.delete(`/payetonkawa/api/v1/deleteCustomer/${customer.id}`)

    response.assertStatus(204)
  })
})

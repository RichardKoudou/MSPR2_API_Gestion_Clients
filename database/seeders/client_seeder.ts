import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class ClientSeeder extends BaseSeeder {
  public async run () {
    const { ClientFactory } = await import('../factories/client_factory.js') // <-- Note le `.js` ici !
    await ClientFactory.createMany(300)
  }
}
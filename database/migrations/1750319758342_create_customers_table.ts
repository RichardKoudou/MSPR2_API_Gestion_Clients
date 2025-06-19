import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'customers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('last_name').notNullable()
      table.string('first_name').notNullable()
      table.string('phone').notNullable()
      table.string('company_name').notNullable()
      table.string('siret').notNullable()
      table.string('role').notNullable()
      table.string('address_line1').notNullable()
      table.string('address_line2').notNullable()
      table.string('postal_code').notNullable()
      table.string('city').notNullable()
      table.string('country').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
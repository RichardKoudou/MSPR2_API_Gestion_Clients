import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import hash from '@adonisjs/core/services/hash'

export default class Customers extends BaseModel {
  static async verifyCredentials(email: string, password: string) {
    const customer = await this.findByOrFail('email', email)
    const verified = await hash.verify(customer.password, password)
    if (!verified) {
      throw new Error('Invalid credentials')
    }
    return customer
  }

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare last_name: string | null

  @column()
  declare first_name: string | null

  @column()
  declare phone: string | null

  @column()
  declare company_name: string | null

  @column()
  declare siret: string | null

  @column()
  declare role: string | null

  @column()
  declare address_line_1: string | null

  @column()
  declare address_line_2: string | null

  @column()
  declare postal_code: string | null

  @column()
  declare city: string | null

  @column()
  declare country: string | null

  @column()
  declare isActive: Boolean | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  static accessTokens = DbAccessTokensProvider.forModel(Customers)
}
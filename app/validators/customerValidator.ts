import vine from '@vinejs/vine'


export const customerValidator = vine.compile(
    vine.object({
    last_name: vine.string().trim().minLength(2),
    first_name: vine.string().trim().minLength(3),
    email: vine.string().trim().email(),
    phone: vine.string().trim().minLength(8),
    company_name : vine.string().trim().minLength(1),
    siret: vine.string().trim().minLength(9).maxLength(14), // Les 9 premiers chiffres constituent le numéro SIREN et Les 5 chiffres suivants (les 10ème, 11ème, 12ème, 13ème et 14ème) constituent le NIC (Numéro Interne de Classement).
    role: vine.enum(['Professionnel', 'Particulier']),
    address_line1: vine.string().minLength(5),
    address_line2: vine.string().minLength(5).optional(),
    postal_code: vine.string().minLength(5),
    city: vine.string().minLength(3),
    country: vine.string().minLength(3),
    password: vine.string()
      .minLength(8)
  })
)
export const updateCustomerValidator = vine.compile(
    vine.object({
    phone: vine.string().trim().minLength(8),
    company_name : vine.string().trim().minLength(1),
    address_line1: vine.string().minLength(5),
    postal_code: vine.string().minLength(5),
    city: vine.string().minLength(3),
    country: vine.string().minLength(3),
    password: vine.string()
      .minLength(8)
      .trim()
    })
)

      
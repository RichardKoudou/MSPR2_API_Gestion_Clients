import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().minLength(8)
  })
)
export const customerValidator = vine.compile(
    vine.object({
    last_name: vine.string().trim().minLength(2),
    first_name: vine.string().trim().minLength(3),
    email: vine.string().trim().email(),
    phone: vine.string().trim().minLength(8),
    company: vine.object({
      name: vine.string().minLength(1).optional(),
      siret: vine.string().minLength(9).maxLength(14).optional(),
    }), // Les 9 premiers chiffres du siret constituent le numéro SIREN et Les 5 chiffres suivants (les 10ème, 11ème, 12ème, 13ème et 14ème) constituent le NIC (Numéro Interne de Classement).
    role: vine.enum(['Professionnel', 'Particulier', 'admin']),
    address: vine.object({
      line1: vine.string().minLength(5),
      line2: vine.string().minLength(5).optional(),
      postal_code: vine.string().minLength(5),
      city: vine.string().minLength(3),
      country: vine.string().minLength(3),
    }),
    password: vine.string()
      .minLength(8)
  })
)
export const updateCustomerValidator = vine.compile(
    vine.object({
    password: vine.string()
      .minLength(8)
      .trim()
    })
)

      
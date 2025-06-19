import vine from '@vinejs/vine'


export const customerValidator = vine.compile(
    vine.object({
    last_name: vine.string().trim().minLength(2),
    first_name: vine.string().trim().minLength(3),
    email: vine.string().trim().email(),
    password: vine.string()
      .minLength(8)
      /*.refine((value: string) => /[a-z]/.test(value), {
        message: 'Le mot de passe doit contenir au moins une lettre minuscule',
      })
      .refine((value: string) => /[A-Z]/.test(value), {
        message: 'Le mot de passe doit contenir au moins une lettre majuscule',
      }),*/
  })
)
export const updateCustomerValidator = vine.compile(
    vine.object({
    password: vine.string()
      .minLength(8)
      .trim()
    })
)

      
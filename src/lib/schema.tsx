import { z } from 'zod'

export const FormDataSchema = z.object({
  plan: z.string().min(1, 'Lütfen Plan Seçiniz'),
  cardName: z.string().min(1, 'Kart Üzerindeki İsim Gerekli'),
  cardNumber: z.string().min(1, 'Kart Numarası Gerekli'),
  expirationDate: z.string().min(1, 'Son Kullanma Tarihi Gerekli'),
  cvc: z.string().min(1, 'Cvc Gerekli')
})
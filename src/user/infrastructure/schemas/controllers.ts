import { z } from "zod";

const userSchema = z.object({
  name: z.string({ message: 'name is required' }),
  email: z.string({ message: 'email is required' }),
  document: z.string({ message: 'document is required' }).min(5),
  birthDate: z.string({ message: 'birthDate is required' }).date(),
  telefono: z.string({ message: 'telefono is required' }).min(5),
  description: z.string().optional()
})

export const validateUser = (dataUser: unknown) => {
  const { success, data, error } = userSchema.safeParse(dataUser)
  
  if(!success){
    throw new Error(error.errors[0]?.message)
  }

  return data
}
import { z } from "zod";

const userSchema = z.object({
  name: z.string({ message: 'name is required' }),
  email: z.string({ message: 'email is required' }),
  description: z.string().optional()
})

export const validateUser = (dataUser: unknown) => {
  const { success, data, error } = userSchema.safeParse(dataUser)
  
  if(!success){
    throw new Error(error.errors[0]?.message)
  }

  return data
}
import { z, treeifyError, prettifyError } from "zod";
import { th } from "zod/v4/locales";

const UserSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  documentId: z.string().min(1, "Document ID is required"),
  password: z.string().min(5, "Password must be at least 5 characters long"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const validateUserDto = (userInfo: unknown) => {
  const { success, data, error } = UserSchema.safeParse(userInfo);

  if (!success) {
    const formattedError = prettifyError(error);
    throw new Error(`Invalid zod user data: ${formattedError}`);
  }

  return data;
};

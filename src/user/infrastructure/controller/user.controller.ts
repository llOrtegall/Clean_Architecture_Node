import { validateUser } from "@infrastructure/schemas/controllers";
import type { UserUseCase } from "@application/user.usecase";
import type { Request, Response } from "express";
import { z } from "zod";

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  public getController = async (req: Request, res: Response) => {
    const uuidSchema = z.object({ uuid: z.string() });

    const { success, data, error } = uuidSchema.safeParse(req.params);

    if (!success) {
      res.status(400).json({ error: "Invalid or missing uuid parameter", message: error.format() });
      return
    }

    try {
      const user = await this.userUseCase.getUserProfile(data.uuid);
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public insertController = async(req: Request, res: Response) => {
    try {
      const validate = validateUser(req.body)

      const user = await this.userUseCase.createNewUser(validate)
      
      res.status(201).json({ user })
    } catch (err) {
      console.log(err);

      if (err instanceof Error) {
        res.status(400).json({ message: err.message })
        return
      }
      res.status(500).json({ message: 'error interno en el servidor'})
    }
  }

  public listController = async (_req: Request, res: Response) => {
    try {
      const users = await this.userUseCase.getAllUsers()
      res.status(200).json({ users })
    } catch (error) {
      res.status(500).json({ error: "Internal server error" })
    }
  }
}
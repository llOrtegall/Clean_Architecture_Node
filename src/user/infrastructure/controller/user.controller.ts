import { z } from "zod";
import type { UserUseCase } from "../../application/user.usecase";
import type { Request, Response } from "express";

export class UserController {
  constructor(private userUseCase: UserUseCase) {
  }

  public async getController(req: Request, res: Response) {
    const uuidSchema = z.object({ uuid: z.string() });

    const { success, data, error } = uuidSchema.safeParse(req.query);

    if (!success) {
      res.status(400).json({ error: "Invalid or missing uuid parameter", message: error.format() });
      return
    }

    try {
      const user = await this.userUseCase.getDetailUser(data.uuid);
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public async insertController(req: Request, res: Response) {
    try {
      const user = await this.userUseCase.registerUser(req.body)
      res.status(201).json({ user })
    } catch (error) {

    }
  }
}
import { registerUser } from "@/controllers/auth.controller";
import { registerSchema } from "@/validation/auth.schema";
import { asyncHandler, validateRequest } from "@chatapp/shared";
import { Router } from "express";

export const authRouter: Router = Router();

authRouter.post(
  "/register",
  validateRequest({ body: registerSchema }),
  asyncHandler(registerUser),
);

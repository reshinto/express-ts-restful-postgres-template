import express, { Request, Response } from "express";
import passport from "passport";
import { authSchema } from "../models/authenticate";
import { PassportAuth } from "../resources/constants";
import endpoints from "../resources/constants/routes";
import { validateSchema } from "../resources/middlewares/schemas";
import { generateAccessToken } from "../services/jwt";

const authRouter = express.Router();

authRouter.post(
  endpoints.authenticate.login,
  validateSchema(authSchema),
  passport.authenticate(PassportAuth.Local, { session: false }),
  async (req: Request, res: Response) => {
    const token = generateAccessToken(req.body.username);

    res.json({ token });
  },
);

export default authRouter;

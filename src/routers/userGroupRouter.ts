import express, { Request, Response } from "express";
import { userGroupSchema } from "../models/userGroup";
import endpoints from "../resources/constants/routes";
import { addUsersToGroup, getUserGroup } from "../services/userGroup";
import { checkJwtToken } from "../services/jwt";
import { validateSchema } from "../resources/middlewares/schemas";

const userGroupRouter = express.Router();

userGroupRouter.get(
  endpoints.userGroup.usergroup,
  checkJwtToken,
  async (req: Request, res: Response) => {
    const userGroup = await getUserGroup();

    res.json(userGroup);
  },
);

userGroupRouter.post(
  endpoints.userGroup.addUsers,
  checkJwtToken,
  validateSchema(userGroupSchema),
  async (req: Request, res: Response) => {
    const { groupId, userIds } = req.body;
    const userGroup = await addUsersToGroup(groupId, userIds);

    res.json(userGroup);
  },
);

export default userGroupRouter;

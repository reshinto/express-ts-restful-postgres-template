import express, { Request, Response } from "express";
import { groupSchema } from "../models/group";
import endpoints from "../resources/constants/routes";
import { validateSchema } from "../resources/middlewares/schemas";
import {
  addGroup,
  deleteGroup,
  getGroup,
  getGroups,
  updateGroup,
} from "../services/group";
import { checkJwtToken } from "../services/jwt";

const groupRouter = express.Router();

groupRouter.get(
  endpoints.group.groups,
  checkJwtToken,
  async (req: Request, res: Response) => {
    const groups = await getGroups();

    res.json(groups);
  },
);

groupRouter.get(
  endpoints.group.groupId,
  checkJwtToken,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const group = await getGroup(id);

    res.json(group);
  },
);

groupRouter.delete(
  endpoints.group.groupId,
  checkJwtToken,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedGroups = await deleteGroup(id);

    res.json(updatedGroups);
  },
);

groupRouter.put(
  endpoints.group.groupId,
  checkJwtToken,
  validateSchema(groupSchema),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedGroup = await updateGroup(id, req.body);

    res.json(updatedGroup);
  },
);

groupRouter.post(
  endpoints.group.create,
  checkJwtToken,
  validateSchema(groupSchema),
  async (req: Request, res: Response) => {
    const newGroups = await addGroup(req.body);

    res.json(newGroups);
  },
);

export default groupRouter;

import Joi from "joi";
import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../loaders/postgres";
import { DbTableNames, ModelNames } from "../resources/constants";

export const userGroupSchema = Joi.object().keys({
  groupId: Joi.string().required(),
  userIds: Joi.array().items(Joi.string()).required(),
});

export interface UserGroupAttributes {
  id?: string;
  user_id: string;
  group_id: string;
  created_at?: string;
  updated_at?: string;
}

export type UserGroupCreationAttributes = Optional<
  UserGroupAttributes,
  DbTableNames.Id | DbTableNames.CreatedAt | DbTableNames.UpdatedAt
>;

const UserGroup: ModelDefined<
  UserGroupAttributes,
  UserGroupCreationAttributes
> = sequelize.define(
  ModelNames.UserGroups,
  {
    id: {
      type: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: DataTypes.UUIDV4,
    group_id: DataTypes.UUIDV4,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

export default UserGroup;

import Joi from "joi";
import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../loaders/postgres";
import {
  DbTableNames,
  JoiGroup,
  ModelNames,
  Permissions,
  Regex,
} from "../resources/constants";
import { setRegex } from "../resources/helpers/joi";

export const groupSchema = Joi.object().keys({
  name: Joi.string().min(JoiGroup.min1).required(),
  permissions: Joi.array()
    .items(
      Joi.string().regex(
        setRegex(
          JoiGroup.minUndefined,
          JoiGroup.maxUndefined,
          Regex.Permissions,
        ),
      ),
    )
    .required(),
});

type Permission =
  | Permissions.Read
  | Permissions.Write
  | Permissions.Delete
  | Permissions.Share
  | Permissions.UploadFiles;

export interface GroupAttributes {
  id?: string;
  name: string;
  permissions: Array<Permission>;
  created_at?: string;
  updated_at?: string;
}

export type GroupCreationAttributes = Optional<
  GroupAttributes,
  DbTableNames.Id | DbTableNames.CreatedAt | DbTableNames.UpdatedAt
>;

const Group: ModelDefined<GroupAttributes, GroupCreationAttributes> =
  sequelize.define(
    ModelNames.Groups,
    {
      id: {
        type: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: { type: DataTypes.STRING, unique: true },
      permissions: DataTypes.ARRAY(DataTypes.STRING),
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      createdAt: false,
      updatedAt: false,
    },
  );

export default Group;

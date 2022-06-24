import Joi from "joi";
import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../loaders/postgres";
import {
  DbTableNames,
  JoiUser,
  ModelNames,
  Regex,
} from "../resources/constants";
import { setRegex } from "../resources/helpers/joi";

export const userSchema = Joi.object().keys({
  login: Joi.string().alphanum().min(JoiUser.min3).required(),
  password: Joi.string()
    .regex(
      setRegex(
        JoiUser.min6,
        JoiUser.maxUndefined,
        Regex.OneUppercase,
        Regex.OneLowercase,
        Regex.OneDigit,
      ),
    )
    .required(),
  age: Joi.number().integer().min(JoiUser.min4).max(JoiUser.max130).required(),
  isDeleted: Joi.boolean(),
});

export interface UserAttributes {
  id?: string;
  login: string;
  password: string;
  age: number;
  is_deleted?: boolean;
  created_at?: string;
  updated_at?: string;
}

export type UserCreationAttributes = Optional<
  UserAttributes,
  | DbTableNames.Id
  | DbTableNames.IsDeleted
  | DbTableNames.CreatedAt
  | DbTableNames.UpdatedAt
>;

const User: ModelDefined<UserAttributes, UserCreationAttributes> =
  sequelize.define(
    ModelNames.Users,
    {
      id: {
        type: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      login: DataTypes.STRING,
      password: DataTypes.STRING,
      age: DataTypes.SMALLINT,
      is_deleted: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      createdAt: false,
      updatedAt: false,
    },
  );

export default User;

import Joi from "joi";
import { JoiAuthenticate, Regex } from "../resources/constants";
import { setRegex } from "../resources/helpers/joi";

export const authSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(JoiAuthenticate.min3).required(),
  password: Joi.string()
    .regex(
      setRegex(
        JoiAuthenticate.min6,
        JoiAuthenticate.maxUndefined,
        Regex.OneUppercase,
        Regex.OneLowercase,
        Regex.OneDigit,
      ),
    )
    .required(),
});

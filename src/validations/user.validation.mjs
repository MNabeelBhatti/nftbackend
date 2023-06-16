import Joi from "joi";

export const createUser = Joi.object({
  email: Joi.string().email().invalid("admin@gmail.com"),
  password: Joi.string().min(8).required(),
  username: Joi.string().min(6).required(),
  wallet_addr: Joi.string().min(6).required(),
}).unknown();
export const createUserwithWalletAddress = Joi.object({
  wallet_addr: Joi.string().min(6).required(),
}).unknown();
export const updateUser = Joi.object({
  email: Joi.string().email().invalid("admin@mail.com"),
  password: Joi.string(),
  name: Joi.string().allow(null),
  //gender should be enum
  gender: Joi.string().valid("Male", "Female", "Other").allow(null),
});

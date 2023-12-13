import Joi from "joi";

export const registerUserSchema = Joi.object({
  full_name: Joi.string(),
  username: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
});

export const postSchema = Joi.object({
  post_text: Joi.string(),
  image_url: Joi.string(),
  user_id:Joi.string()
});

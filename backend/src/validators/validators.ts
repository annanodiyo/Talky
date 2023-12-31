import Joi from "joi";

export const registerUserSchema = Joi.object({
  full_name: Joi.string(),
  username: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
});
export const UsersSchema = Joi.object({
  full_name: Joi.string(),
  username: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  user_id: Joi.string(),
  is_Deleted: Joi.boolean().default(false)
});

export const postSchema = Joi.object({
  post_text: Joi.string(),
  image_url: Joi.string(),
  user_id:Joi.string()
});

export const commentsSchema = Joi.object({
  comment_text: Joi.string(),
  post_id: Joi.string(),
  user_id: Joi.string(),
  comment_id: Joi.string()
});

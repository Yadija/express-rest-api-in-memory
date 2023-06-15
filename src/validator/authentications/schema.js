import Joi from 'joi';

const PostAuthenticationPayload = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export { PostAuthenticationPayload };

const Joi = require("joi");

const registerValidation = (object) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).max(100).required(),
    password: Joi.string().min(6).max(1024).required(),
    password2: Joi.string().min(6).max(1024).required(),
    role: Joi.string().required().valid("student", "instructor", "admin"),
  });
  return schema.validate(object);
};

const loginValidation = (object) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(100).required(),
    password: Joi.string().min(6).max(1024).required(),
    password2: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(object);
};

const courseValidation = (object) => {
  const schema = Joi.object({
    title: Joi.string().min(6).max(50).required(),
    description: Joi.string().min(6).max(50).required(),
  });
  return schema.validate(object);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.courseValidation = courseValidation;

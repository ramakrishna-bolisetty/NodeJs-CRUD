"use strict";

var Joi = require('joi');
var validator = function validator(schema) {
  return function (payload) {
    return schema.validate(payload, {
      abortEarly: false
    });
  };
};
var userSchema = Joi.object({
  id: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().min(3).max(10).alphanum().required(),
  age: Joi.number().integer().min(4).max(130).required(),
  isDeleted: Joi["boolean"]().required()
});
exports.validateSchema = validator(userSchema);
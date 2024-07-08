const Joi = require('joi')
const { Schema, model } = require('mongoose')
const handleMongooseError = require('../middlewares/handleMongooseError')

const emailRegexp = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/
// const phoneNumberRegex =
//   /^\+\d{1,3}\s?\(\d{3}\)\s?\d{3}(-|\s)?\d{2}(-|\s)?\d{2}$/

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },

    nick_name: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: emailRegexp,
      unique: true,
    },
    phone_number: {
      type: String,
      required: true,
      // match: phoneNumberRegex,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    token: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
)

userSchema.post('save', handleMongooseError)

const registerSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  nick_name: Joi.string().required(),
  isAdmin: Joi.boolean(),
  description: Joi.string().required(),
  position: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  // phone_number: Joi.string().pattern(phoneNumberRegex).required(),
  phone_number: Joi.string().required(),
  password: Joi.string().min(6).required(),
})

const updateUsersSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  nick_name: Joi.string().required(),
  isAdmin: Joi.boolean(),
  description: Joi.string().required(),
  position: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone_number: Joi.string().required(),
})

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
})

const updateIsAdmin = Joi.object({
  isAdmin: Joi.boolean().required(),
})

const schemas = {
  registerSchema,
  loginSchema,
  updateIsAdmin,
  updateUsersSchema,
}

const User = model('user', userSchema)

module.exports = { User, schemas }

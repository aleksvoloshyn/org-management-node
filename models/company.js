const Joi = require('joi')
const { Schema, model } = require('mongoose')
const handleMongooseError = require('../middlewares/handleMongooseError')

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for the company'],
    },
    address: {
      type: String,
    },
    serviceOfActivity: {
      type: String,
    },
    numberOfEmployees: {
      type: String,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
)

companySchema.post('save', handleMongooseError)

const createCompanySchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string(),
  serviceOfActivity: Joi.string(),
  numberOfEmployees: Joi.string(),
  description: Joi.string(),
  type: Joi.string(),
})

// const updateContactSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// })
// const updateFavoriteSchema = Joi.object({
//   favorite: Joi.boolean().required(),
// })

const schemas = {
  createCompanySchema,
  // updateContactSchema,
  // updateFavoriteSchema,
}

const Company = model('company', companySchema)

module.exports = { Company, schemas }

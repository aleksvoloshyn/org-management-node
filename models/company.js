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

const updateCompanySchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  serviceOfActivity: Joi.string().required(),
  numberOfEmployees: Joi.string().required(),
  description: Joi.string().required(),
  type: Joi.string().required(),
})

const schemas = {
  createCompanySchema,
  updateCompanySchema,
}

const Company = model('company', companySchema)

module.exports = { Company, schemas }

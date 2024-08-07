const express = require('express')
const ctrl = require('../../controllers/companiesControllers')
const companiesRouter = express.Router()
const validateBody = require('../../middlewares/validateBody')
const isValidId = require('../../middlewares/isValidId')
const authenticate = require('../../middlewares/authenticate')
const isAdmin = require('../../middlewares/isAdmin')

const { schemas } = require('../../models/company')

companiesRouter.get('/', authenticate, ctrl.getAllCompanies)
companiesRouter.get(
  '/admin/all',
  authenticate,
  isAdmin,
  ctrl.getAllCompaniesAdmin
)

// companiesRouter.get('/:id', authenticate, isValidId, ctrl.getOneCompanyById)
companiesRouter.get('/:id', isValidId, ctrl.getOneCompanyById)

companiesRouter.delete('/:id', authenticate, ctrl.deleteCompany)

companiesRouter.post(
  '/',
  authenticate,
  validateBody(schemas.createCompanySchema),
  ctrl.createCompany
)

companiesRouter.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(schemas.updateCompanySchema),
  ctrl.updateCompany
)

module.exports = companiesRouter

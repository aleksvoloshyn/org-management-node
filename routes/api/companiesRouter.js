const express = require('express')
const ctrl = require('../../controllers/contactsControllers')
const companiesRouter = express.Router()
const validateBody = require('../../middlewares/validateBody')
const isValidId = require('../../middlewares/isValidId')
const authenticate = require('../../middlewares/authenticate')

const { schemas } = require('../../models/company')

companiesRouter.get('/', authenticate, ctrl.getAllCompanies)

companiesRouter.get('/:id', authenticate, isValidId, ctrl.getOneCompanyById)

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
// companiesRouter.patch(
//   '/:id/favorite',
//   authenticate,
//   isValidId,
//   validateBody(schemas.updateFavoriteSchema),
//   ctrl.updateFavorite
// )

module.exports = companiesRouter

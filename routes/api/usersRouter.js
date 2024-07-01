const express = require('express')
const ctrl = require('../../controllers/usersController')
const validateBody = require('../../middlewares/validateBody')
const authenticate = require('../../middlewares/authenticate')
const isValidId = require('../../middlewares/isValidId')
const { schemas } = require('../../models/user')
const router = express.Router()

// current user by token
router.get('/current', authenticate, ctrl.getCurrent)

// profile
router.get('/profile', authenticate, ctrl.getProfile)

// change admin rights
router.patch(
  '/:id/isAdmin',
  authenticate,
  isValidId,
  validateBody(schemas.updateIsAdmin),
  ctrl.updateIsAdmin
)

// get all users
router.get('/userslist', authenticate, ctrl.getUserList)

module.exports = router

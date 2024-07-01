const express = require('express')
const ctrl = require('../../controllers/auth')
const validateBody = require('../../middlewares/validateBody')
const authenticate = require('../../middlewares/authenticate')
const isValidId = require('../../middlewares/isValidId')
const { schemas } = require('../../models/user')
const router = express.Router()

// signup
router.post('/signup', validateBody(schemas.registerSchema), ctrl.register)

// sighin
router.post('/signin', validateBody(schemas.loginSchema), ctrl.login)

// current user by token
router.get('/current', authenticate, ctrl.getCurrent)

// profile
router.get('/profile', authenticate, ctrl.getProfile)

// logout
router.post('/logout', authenticate, ctrl.logout)

// change admin rights
router.patch(
  '/:id/isAdmin',
  authenticate,
  isValidId,
  validateBody(schemas.updateIsAdmin),
  ctrl.updateIsAdmin
)

// get all users
router.get('/userlist', authenticate, ctrl.getUserList)

module.exports = router

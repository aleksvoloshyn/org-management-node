const express = require('express')
const ctrl = require('../../controllers/auth')
const validateBody = require('../../middlewares/validateBody')
const authenticate = require('../../middlewares/authenticate')
const { schemas } = require('../../models/user')
const router = express.Router()

// signup
router.post('/signup', validateBody(schemas.registerSchema), ctrl.register)

// sighin
router.post('/signin', validateBody(schemas.loginSchema), ctrl.login)

// current user by token
router.get('/current', authenticate, ctrl.getCurrent)

// logout
router.post('/logout', authenticate, ctrl.logout)

module.exports = router

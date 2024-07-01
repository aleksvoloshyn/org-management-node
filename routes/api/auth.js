const express = require('express')
const ctrl = require('../../controllers/auth')
const validateBody = require('../../middlewares/validateBody')
const { schemas } = require('../../models/user')
const router = express.Router()

// signup
router.post('/register', validateBody(schemas.registerSchema), ctrl.register)

// sighin
router.post('/login', validateBody(schemas.loginSchema), ctrl.login)
module.exports = router

const jwt = require('jsonwebtoken')
const { User } = require('../models/user')
const HttpError = require('../middlewares/HttpError')

const { SECRET_KEY } = process.env

// проверка на выдачу токена
const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers
  const [bearer, token] = authorization.split(' ')
  if (bearer !== 'Bearer') {
    next(HttpError(401))
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY)
    const user = await User.findById(id)
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401))
    }
    req.user = user
    // adding author to request.user
    next()
  } catch {
    next(HttpError(401))
  }
}

module.exports = authenticate

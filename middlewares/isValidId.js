const { isValidObjectId } = require('mongoose')

const HttpError = require('../middlewares/HttpError')

const isValidId = (req, res, next) => {
  const { id } = req.params
  if (!isValidObjectId(id)) {
    // next(HttpError(400, `${id} is not valid id`))
    next(HttpError(404, ` not found`))
  }
  next()
}

module.exports = isValidId

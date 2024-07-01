const { User } = require('../models/user')

const HttpError = require('../middlewares/HttpError')
const ctrlWrapper = require('../middlewares/ctrlWrapper')

const getCurrent = async (req, res) => {
  const { email, nick_name } = req.user
  res.json({ email, nick_name })
}
const getProfile = async (req, res) => {
  res.json(req.user)
}

const updateIsAdmin = async (req, res) => {
  const { id } = req.params
  const result = await User.findByIdAndUpdate(id, req.body, { new: true })
  if (!result) {
    throw HttpError(404, 'Not found')
  }
  res.json(result)
}

const getUserList = async (req, res) => {
  const { _id: owner } = req.user
  const result = await User.find({ owner }, '-createdAt -updatedAt').populate()
  res.json(result)
}

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
  getProfile: ctrlWrapper(getProfile),
  updateIsAdmin: ctrlWrapper(updateIsAdmin),
  getUserList: ctrlWrapper(getUserList),
}

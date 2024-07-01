const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models/user')

const HttpError = require('../middlewares/HttpError')
const ctrlWrapper = require('../middlewares/ctrlWrapper')
const { SECRET_KEY } = process.env

const signup = async (req, res) => {
  const { email, password, nick_name } = req.body
  const userEmail = await User.findOne({ email })
  const userNickName = await User.findOne({ nick_name })

  // проверки на повторные использования (email, nickname)
  if (userEmail) {
    throw HttpError(409, 'Email already in use')
  }
  if (userNickName) {
    throw HttpError(409, `Nickname ${nick_name} already exists`)
  }

  const hashPassword = await bcrypt.hash(password, 10)
  console.log(hashPassword)
  const newUser = await User.create({ ...req.body, password: hashPassword })
  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  })
}
const signin = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    throw HttpError(401, 'Email or password invalid')
  }
  const passwordCompare = await bcrypt.compare(password, user.password)
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password invalid')
  }

  const payload = {
    id: user.id,
  }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' })

  await User.findByIdAndUpdate(user._id, { token })

  res.json({ token })
}

const getCurrent = async (req, res) => {
  const { email, nick_name } = req.user
  res.json({ email, nick_name })
}
const getProfile = async (req, res) => {
  res.json(req.user)
}

const logout = async (req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: '' })
  res.json({ message: 'Logout success' })
}

module.exports = {
  register: ctrlWrapper(signup),
  login: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  getProfile: ctrlWrapper(getProfile),
  logout: ctrlWrapper(logout),
}

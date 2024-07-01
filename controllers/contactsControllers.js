const { Company } = require('../models/company')
const HttpError = require('../middlewares/HttpError')
const ctrlWrapper = require('../middlewares/ctrlWrapper')

const getAllCompanies = async (req, res) => {
  const { _id: owner } = req.user
  const result = await Company.find(
    { owner },
    '-createdAt -updatedAt'
  ).populate()
  res.json(result)
}

const getOneCompanyById = async (req, res) => {
  const { id } = req.params
  // const result = await Contact.findOne({ _id: id })
  const result = await Company.findById(id)
  if (!result) {
    throw HttpError(404, 'Not found')
  }
  res.json(result)
}

const deleteCompany = async (req, res) => {
  const { id } = req.params
  const result = await Company.findByIdAndDelete(id)
  if (!result) {
    throw HttpError(404, 'Not found')
  }
  res.json({
    message: 'Delete success',
  })
}

const createCompany = async (req, res) => {
  const { _id: owner } = req.user
  const result = await Company.create({ ...req.body, owner })
  res.status(201).json(result)
}

const updateCompany = async (req, res) => {
  const { id } = req.params
  const result = await Company.findByIdAndUpdate(id, req.body, { new: true })
  if (!result) {
    throw HttpError(404, 'Not found')
  }
  res.json(result)
}

module.exports = {
  getAllCompanies: ctrlWrapper(getAllCompanies),
  getOneCompanyById: ctrlWrapper(getOneCompanyById),
  deleteCompany: ctrlWrapper(deleteCompany),
  createCompany: ctrlWrapper(createCompany),
  updateCompany: ctrlWrapper(updateCompany),
}

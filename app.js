const express = require('express')
const logger = require('morgan')

const cors = require('cors')

require('dotenv').config()

const authRouter = require('./routes/api/auth')
const companiesRouter = require('./routes/api/companiesRouter')
const usersRouter = require('./routes/api/usersRouter')

const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))

app.use(logger('tiny'))
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/companies', companiesRouter)
app.use('/api/users/', usersRouter)

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ message })
})

module.exports = app

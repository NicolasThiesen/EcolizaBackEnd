const express = require('express')
const requireDir = require('require-dir')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
mongoose.connect(process.env.DATA_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(express.json())

requireDir('./models')

const Ponto = mongoose.model('Ponto')

app.use(cors())

app.use(require('./routes'))

app.listen(3333)

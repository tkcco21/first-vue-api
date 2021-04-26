import express, { response } from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'

import { connection } from './database'
import apiRouter from './routes/api'

const app = express()
const nodeEnv = process.env.NODE_ENV
const isDev = nodeEnv === 'development'

connection.then(() => {
  console.log(`\n --- Connected to database!! --- \n`)
})

let origin = ''
if (isDev) {
  origin = 'http://localhost:8000'
} else {
  origin = 'https://first-vue.tkcco21.me'
}

app.set('port', process.env.PORT || 3000)
app.use(compression())
app.use(helmet())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
// CORSを許可する
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', origin)
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  )
  next()
})

app.get('/test', (req, res) => {
  res.send({ type: 'test' })
})

app.use('/api', apiRouter)

// NOTE: /api以外のパスにきたらリダイレクト
app.get('/', (req, res) => {
  res.status(301).redirect(origin)
})

export { app }
import http from 'http'
import path from 'path'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'

import { logger } from './services/logger.service.js'
import { setupAsyncLocalStorage } from './middlewares/setupAls.middleware.js'

import { expenseRoutes } from './api/expense/expense.routes.js'
import { authRoutes } from './api/auth/auth.routes.js'
import { userRoutes } from './api/user/user.routes.js'

const app = express()
const server = http.createServer(app)

app.use(cookieParser())
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve('public')))
} else {
  const corsOptions = {
    origin: [
      'http://127.0.0.1:3000',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://localhost:5173',
      'http://127.0.0.1:5174',
      'http://localhost:5174',
    ],
    credentials: true,
  }
  app.use(cors(corsOptions))
}

app.all('*', setupAsyncLocalStorage)

app.use('/api/auth', authRoutes)
app.use('/api/user', authRoutes)
app.use('/api/expense', expenseRoutes)

app.get('/**', (req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})

const port = process.env.PORT || 3030
server.listen(port, () => {
  logger.info('Server is running on port: ' + port)
})

import express from 'express'
import { login, signup, logout } from './auth.controller.js'

export const authRoutes = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', logout)

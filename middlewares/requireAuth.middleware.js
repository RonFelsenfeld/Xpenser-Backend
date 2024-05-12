import { asyncLocalStorage } from '../services/als.service.js'

export function requireAuth(req, res, next) {
  const { loggedInUser } = asyncLocalStorage.getStore()
  if (!loggedInUser) return res.status(401).send('Not Authenticated')

  req.loggedInUser = loggedInUser
  next()
}

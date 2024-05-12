import { authService } from '../api/auth/auth.service.js'
import { asyncLocalStorage } from '../services/als.service.js'

export async function setupAsyncLocalStorage(req, res, next) {
  const storage = {}

  asyncLocalStorage.run(storage, () => {
    if (!req.cookies) return next()

    const loggedInUser = authService.validateToken(req.cookies.loginToken)

    if (loggedInUser) {
      const alsStore = asyncLocalStorage.getStore()
      alsStore.loggedInUser = loggedInUser
    }
    next()
  })
}

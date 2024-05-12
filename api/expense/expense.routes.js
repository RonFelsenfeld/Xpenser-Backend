import express from 'express'

import {
  getExpenses,
  getExpenseById,
  addExpense,
  updateExpense,
  removeExpense,
} from './expense.controller.js'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'

export const expenseRoutes = express.Router()

expenseRoutes.get('/', requireAuth, getExpenses)
expenseRoutes.get('/:expenseId', requireAuth, getExpenseById)
expenseRoutes.post('/', requireAuth, addExpense)
expenseRoutes.put('/:expenseId', requireAuth, updateExpense)
expenseRoutes.delete('/:expenseId', requireAuth, removeExpense)

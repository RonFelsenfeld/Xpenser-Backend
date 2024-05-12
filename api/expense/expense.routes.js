import express from 'express'

import {
  getExpenses,
  getExpenseById,
  addExpense,
  updateExpense,
  removeExpense,
} from './expense.controller.js'

export const expenseRoutes = express.Router()

expenseRoutes.get('/', getExpenses)
expenseRoutes.get('/:expenseId', getExpenseById)
expenseRoutes.post('/', addExpense)
expenseRoutes.put('/:expenseId', updateExpense)
expenseRoutes.delete('/:expenseId', removeExpense)

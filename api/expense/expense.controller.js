import { expenseService } from './expense.service.js'
import { logger } from '../../services/logger.service.js'

export async function getExpenses(req, res) {
  const { loggedInUser } = req

  try {
    logger.debug('Getting expenses')
    const expenses = await expenseService.query(loggedInUser._id)
    res.json(expenses)
  } catch (err) {
    logger.error('Failed to get expenses', err)
    res.status(500).send({ err: 'Failed to get expenses' })
  }
}

export async function getExpenseById(req, res) {
  const { loggedInUser } = req

  try {
    const { expenseId } = req.params
    const expense = await expenseService.getById(expenseId, loggedInUser._id)
    res.json(expense)
  } catch (err) {
    logger.error('Failed to get expense', err)
    res.status(500).send({ err: 'Failed to get expense' })
  }
}

export async function addExpense(req, res) {
  const { loggedInUser } = req

  try {
    const expense = req.body
    const addedExpense = await expenseService.add(expense, loggedInUser._id)
    res.json(addedExpense)
  } catch (err) {
    logger.error('Failed to add expense', err)
    res.status(500).send({ err: 'Failed to add expense' })
  }
}

export async function updateExpense(req, res) {
  const { loggedInUser } = req

  try {
    const expense = req.body
    const updatedExpense = await expenseService.update(expense, loggedInUser._id)
    res.json(updatedExpense)
  } catch (err) {
    logger.error('Failed to update expense', err)
    res.status(500).send({ err: 'Failed to update expense' })
  }
}

export async function removeExpense(req, res) {
  const { loggedInUser } = req

  try {
    const { expenseId } = req.params
    await expenseService.remove(expenseId, loggedInUser._id)
    res.send('Expense deleted')
  } catch (err) {
    logger.error('Failed to remove expense', err)
    res.status(500).send({ err: 'Failed to remove expense' })
  }
}

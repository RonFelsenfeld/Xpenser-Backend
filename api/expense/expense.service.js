import mongodb from 'mongodb'
const { ObjectId } = mongodb

import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import { utilService } from '../../services/util.service.js'

export const expenseService = {
  remove,
  query,
  getById,
  add,
  update,
  createDemoExpenses,
}

async function query(userId, filterByCriteria) {
  try {
    const collection = await dbService.getCollection('users')
    let { expenses } = await collection.findOne({ _id: new ObjectId(userId) })

    // ! Checking for filter criteria
    const filterByValues = Object.values(filterByCriteria)

    if (filterByValues.some(val => val)) {
      expenses = _filterExpenses(expenses, filterByCriteria)
    }

    return expenses
  } catch (err) {
    logger.error('Cannot find expenses', err)
    throw err
  }
}

async function getById(expenseId, userId) {
  try {
    const collection = await dbService.getCollection('users')
    const user = await collection.findOne({ _id: new ObjectId(userId) })
    const expense = user.expenses.find(e => e._id === expenseId)
    return expense
  } catch (err) {
    logger.error(`Cannot find expense ${expenseId}`, err)
    throw err
  }
}

async function remove(expenseId, userId) {
  try {
    const collection = await dbService.getCollection('users')
    await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $pull: { expenses: { _id: expenseId } } }
    )
  } catch (err) {
    logger.error(`Cannot remove expense ${expenseId}`, err)
    throw err
  }
}

async function add(expense, userId) {
  const expenseToSave = {
    ...expense,
    _id: utilService.makeId(),
  }

  try {
    const collection = await dbService.getCollection('users')
    await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $push: { expenses: expenseToSave } }
    )
    return expenseToSave
  } catch (err) {
    logger.error('Cannot add expense', err)
    throw err
  }
}

async function update(expense, userId) {
  try {
    const expenseToSave = {
      _id: expense._id,
      txt: expense.txt,
      amount: expense.amount,
      category: expense.category,
      at: expense.at,
      notes: expense.notes,
    }

    const collection = await dbService.getCollection('users')
    await collection.updateOne(
      { _id: new ObjectId(userId), 'expenses._id': expense._id },
      { $set: { 'expenses.$': expenseToSave } }
    )

    return expenseToSave
  } catch (err) {
    logger.error(`Cannot update expense ${expense._id}`, err)
    throw err
  }
}

////////////////////////////////////////////////////

function _filterExpenses(expenses, { txt, at, category }) {
  let expensesToReturn = expenses.slice()

  if (txt) {
    const regExp = new RegExp(txt, 'i')
    expensesToReturn = expensesToReturn.filter(e => regExp.test(e.txt))
  }

  if (at) {
    const { from, to } = at
    expensesToReturn = expensesToReturn.filter(e => e.at >= from && e.at <= to)
  }

  if (category) {
    expensesToReturn = expensesToReturn.filter(e => e.category === category)
  }

  return expensesToReturn
}

function createDemoExpenses() {
  const expense1 = _createDemoExpense('Running shoes', 360, 'other')
  const expense2 = _createDemoExpense('Dinner with dad', 276, 'food')
  const expense3 = _createDemoExpense('Gym subscription', 120, 'utilities')

  return [expense1, expense2, expense3]
}

function _createDemoExpense(txt, amount, category) {
  return {
    _id: utilService.makeId(),
    txt,
    amount,
    at: '',
    category,
    notes: '',
  }
}

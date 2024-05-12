import mongodb from 'mongodb'
const { ObjectId } = mongodb

import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
// import { expenseService } from './expense.service.js'

export const expenseService = {
  remove,
  query,
  getById,
  add,
  update,
}

async function query() {
  try {
    const collection = await dbService.getCollection('entities')
    const entities = await collection.find().toArray()
    return entities
  } catch (err) {
    logger.error('Cannot find entities', err)
    throw err
  }
}

async function getById(entityId) {
  try {
    const collection = await dbService.getCollection('entities')
    const entity = collection.findOne({ _id: new ObjectId(entityId) })
    return entity
  } catch (err) {
    logger.error(`Cannot find entity ${entityId}`, err)
    throw err
  }
}

async function remove(entityId) {
  try {
    const collection = await dbService.getCollection('entities')
    await collection.deleteOne({ _id: new ObjectId(entityId) })
  } catch (err) {
    logger.error(`Cannot remove entity ${entityId}`, err)
    throw err
  }
}

async function add(entity) {
  try {
    const collection = await dbService.getCollection('entities')
    await collection.insertOne(entity)
    return entity
  } catch (err) {
    logger.error('Cannot add entity', err)
    throw err
  }
}

async function update(entity) {
  try {
    // ! Update only selected fields
    const entityToSave = { ...entity }

    const collection = await dbService.getCollection('entities')
    await collection.updateOne({ _id: new ObjectId(entity._id) }, { $set: entityToSave })
    return entityToSave
  } catch (err) {
    logger.error(`Cannot update entity ${entity._id}`, err)
    throw err
  }
}

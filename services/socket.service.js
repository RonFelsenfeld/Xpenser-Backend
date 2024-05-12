import { Server } from 'socket.io'
import { logger } from './logger.service.js'

var gIo = null

export const SOCKET_EVENT_SET_USER = 'set-user-expenses'

export const SOCKET_EMIT_ADD_EXPENSE = 'expense-added'
export const SOCKET_EVENT_EXPENSE_ADDED = 'add-expense'

export const SOCKET_EMIT_REMOVE_EXPENSE = 'expense-removed'
export const SOCKET_EVENT_EXPENSE_REMOVED = 'remove-expense'

export const SOCKET_EMIT_UPDATE_EXPENSE = 'expense-updated'
export const SOCKET_EVENT_EXPENSE_UPDATED = 'update-expense'

export const SOCKET_EMIT_EDITING_EXPENSE = 'expense-is-edited'
export const SOCKET_EVENT_EXPENSE_EDITED = 'editing-expense'

export const socketService = {
  setupSocketAPI,
}

export function setupSocketAPI(server) {
  gIo = new Server(server, {
    cors: {
      origin: '*',
    },
  })

  gIo.on('connection', socket => {
    logger.info(`New connected socket[id:${socket.id}]`)
    socket.on('disconnect', socket => {
      logger.info(`socket disconnected [id:${socket.id}]`)
    })

    socket.on(SOCKET_EVENT_SET_USER, user => {
      if (!user) return
      if (socket.myUser === user) return

      if (socket.myUser) {
        socket.leave(socket.myUser)
        logger.info(`socket is leaving entity ${socket.myUser} [id: ${socket.id}]`)
      }
      socket.join(user._id)
      socket.myUser = user._id
    })

    socket.on(SOCKET_EVENT_EXPENSE_ADDED, expense => {
      logger.info(`Expense added from socket [id:${socket.id}]`)
      socket.broadcast.to(socket.myUser).emit(SOCKET_EMIT_ADD_EXPENSE, expense)
    })

    socket.on(SOCKET_EVENT_EXPENSE_REMOVED, expenseId => {
      logger.info(`Expense removed from socket [id:${socket.id}]`)
      socket.broadcast.to(socket.myUser).emit(SOCKET_EMIT_REMOVE_EXPENSE, expenseId)
    })

    socket.on(SOCKET_EVENT_EXPENSE_UPDATED, expense => {
      logger.info(`Expense updated from socket [id:${socket.id}]`)
      socket.broadcast.to(socket.myUser).emit(SOCKET_EMIT_UPDATE_EXPENSE, expense)
    })

    socket.on(SOCKET_EVENT_EXPENSE_EDITED, () => {
      logger.info(`Expense is currently edited from socket [id:${socket.id}]`)
      socket.broadcast.to(socket.myUser).emit(SOCKET_EMIT_EDITING_EXPENSE)
    })

    socket.on('set-user-socket', userId => {
      logger.info(`Setting socket.userId = ${userId} for socket [id: ${socket.id}]`)
      socket.userId = userId
    })

    socket.on('unset-user-socket', () => {
      logger.info(`Removing socket.userId for socket [id: ${socket.id}]`)
      delete socket.userId
    })
  })
}

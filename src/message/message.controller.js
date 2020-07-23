const Message = require('./message.repositories')

let controller = {
  getById: async (id, ctx, next) => {
    try {
      ctx.message = await Message.findById(id)
      if (!ctx.message) return (ctx.status = 404)
      return next()
    } catch (err) {
      ctx.status = 400
    }
  },

  create: async ctx => {
    try {
      ctx.user = await UserServices.findById(ctx.request.body.owner)
      if (!ctx.user) return (ctx.status = 404)

      if(ctx.request.body.letterMessage && ctx.request.body.numberMessage) return (ctx.status = 400)

      ctx.body = Message.create(ctx)
      ctx.status = 201
    } catch (err) {
      ctx.status = 400
    }
  },

  read: async ctx => {
    ctx.body = Message.toClient(ctx.message)
    ctx.status = 200
  },

  update: async ctx => {
    try {
      ctx.user = await UserServices.findById(ctx.request.body.owner)
      if (!ctx.user) return (ctx.status = 404)

      if(ctx.request.body.letterMessage || ctx.request.body.numberMessage) return (ctx.status = 400)

      ctx.body = Message.update(ctx)
      ctx.status = 201
    } catch (err) {
      ctx.status = 400
    }
  },

  delete: async ctx => {
    ctx.body = Message.delete(ctx)
  },

  list: async ctx => {
    ctx.body = await Message.list(ctx)
    ctx.status = 200
  },

  clear: async ctx => {
    ctx.body = await Message.clear()
  }
}

module.exports = controller

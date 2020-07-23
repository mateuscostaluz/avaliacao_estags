Message = require('./message.model')
MessageServices = require('./message.services')
UserServices = require('../user/user.services')

const repositories = {
  toClient: message => message.toClient(),

  findById: async id =>
    await Message.findById(id)
      .populate('owner')
      .exec(),

  findMessages: async () =>
    await Message.find()
      .populate('owner')
      .exec(),

  create: async ctx => {
    ctx.request.body = await MessageServices.conversion(ctx.request.body)

    const message = new Message(ctx.request.body)

    await Message.populate(message, { path: 'owner' })

    await message.save()

    return message.toClient()
  },

  delete: async ctx => await Message.findOneAndDelete({ _id: ctx.message.id }).exec(),

  list: async ctx => {
    const req = {}
    if (ctx.query.owner_id) {
      try {
        const user = await UserServices.findById(ctx.request.body.owner)
        req.owner = user._id
      } catch (err) {
        req.owner = null
      }
    }
    if (ctx.user) req.owner = ctx.user._id
    const messages = await Message.find(req)
      .populate('owner')
      .exec()
    for (let i = 0; i < messages.length; i++) {
      messages[i] = messages[i].toClient()
    }
    return messages
  },

  index: async (ctx) =>  {
    const { page, limit } = ctx.query
    const messages = await Message.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()
    for (let i = 0; i < messages.length; i++) {
      messages[i] = messages[i].toClient()
    }
    return messages
  }
}

module.exports = repositories

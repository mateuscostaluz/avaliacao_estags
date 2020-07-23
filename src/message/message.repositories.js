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

  delete: async ctx => await Message.findOneAndDelete(ctx.message.id).exec(),

  list: async (ctx) =>  {
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

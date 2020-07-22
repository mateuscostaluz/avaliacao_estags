Message = require('./message.model')
MessageServices = require('./message.services')
UserServices = require('../user/user.services')

const repositories = {
  toClient: message => message.toClient(),

  findById: async id =>
    await Record.findById(id)
      .populate('owner')
      .exec(),

  findRecords: async () =>
    await Record.find()
      .populate('owner')
      .exec(),

  create: async ctx => {
    const message = new Message(ctx.request.body)

    await Message.populate(message, { path: 'owner' })

    // message.type = MessageServices.setTypeByValue(message.value)

    await message.save()

    return message.toClient()
  },

  update: async ctx => {
    const message = await Message.findById(ctx.params.message_id)

    await Message.populate(message, { path: 'owner' })

    // message.type = MessageServices.setTypeByValue(message.value)

    await message.save()

    return message.toClient()
  },

  delete: async ctx => await Message.findOneAndDelete({ _id: ctx.message.id }).exec(),

  clear: async () => await Message.deleteMany().exec(),

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
  }
}

module.exports = repositories

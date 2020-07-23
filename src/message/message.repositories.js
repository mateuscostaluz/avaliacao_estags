Message = require('./message.model')
MessageServices = require('./message.services')
UserServices = require('../user/user.services')
const Moment = require('moment')

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
    const { page, limit, date } = ctx.query
    const skip = (page - 1) * limit
    if(date) {
      const allMessages = await Message.find()

      let messagesCount = 0

      const messagesDate = []

      for (let i = 0; i < allMessages.length; i++) {
        if(date === Moment(allMessages[i].createdAt).format('YYYY-MM-DD')) {
          messagesDate[messagesCount] = allMessages[i].toClient()
          messagesCount++
        }
      }

      const limitedList = []

      messagesDate.forEach(function (messageDate, index) {
        if (skip <= index && limitedList.length < limit){
          limitedList.push(messageDate)
        }
      })

      return limitedList
    }
    const messages = await Message.find()
      .limit(limit * 1)
      .skip(skip)
      .exec()

    for (let j = 0; j < messages.length; j++) {
      messages[j] = messages[j].toClient()
    }

    return messages
  }
}

module.exports = repositories

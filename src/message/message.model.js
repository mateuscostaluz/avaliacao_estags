const Mongoose = require('mongoose')
const AutoIncrement = require('mongoose-auto-increment')

const messageSchema = new Mongoose.Schema({
  owner: {
    type: Number,
    required: true,
    ref: 'User'
  },
  lettersMessage: {
    type: String,
    required: false
  },
  numberMessage: {
    type: String,
    required: false
  }
},
{
  timestamps: true
})

messageSchema.method('toClient', function () {
  var obj = this.toObject()

  //Rename fields
  obj.user_id = obj.owner._id
  obj.message_id = obj._id
  obj.letters = obj.letterMessage
  obj.number = obj.numberMessage

  // Delete fields
  delete obj.owner
  delete obj.lettersMessage
  delete obj.numberMessage
  delete obj._id
  delete obj.__v
  delete obj.createdAt
  delete obj.updatedAt

  return obj
})

AutoIncrement.initialize(Mongoose.connection)

messageSchema.plugin(AutoIncrement.plugin, {
  model: 'Message',
  startAt: 1
})

Mongoose.model('Message', messageSchema)

module.exports = Mongoose.model('Message')

const Mongoose = require('mongoose')
const AutoIncrement = require('mongoose-auto-increment')

const messageSchema = new Mongoose.Schema({
  owner: {
    type: Number,
    required: true,
    ref: 'User'
  },
  letterMessage: {
    type: String,
    required: false
  },
  numberMessage: {
    type: Number,
    required: false
  }
},
{
  timestamps: true
})

messageSchema.method('toClient', function () {
  const obj = this.toObject()

  //Rename fields
  obj.id = obj._id

  // Delete fields
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

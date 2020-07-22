 
const Mongoose = require('mongoose')
const AutoIncrement = require('mongoose-auto-increment')

const userSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  }
},
{
  timestamps: true
})

userSchema.method('toClient', function () {
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

userSchema.plugin(AutoIncrement.plugin, {
  model: 'User',
  startAt: 1
})

module.exports = Mongoose.model('User', userSchema)

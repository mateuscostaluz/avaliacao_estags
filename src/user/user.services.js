const User = require('../user/user.repositories')

service = {
  findById: async id => await User.findById(id)
}

module.exports = service

const User = require('../user/user.repositories')

services = {
  findById: async id => await User.findById(id)
}

module.exports = services

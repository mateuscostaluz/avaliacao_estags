module.exports = router => {
  require('./message/message.routes')(router)
  require('./user/user.routes')(router)
}

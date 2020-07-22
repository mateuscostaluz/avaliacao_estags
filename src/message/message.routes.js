const messages = require('./message.controller')

module.exports = router => {
  router
    .param('message_id', messages.getById)
    .post('/messages/', messages.create)
    .get('/messages/:message_id', messages.read)
    .put('/messages/:message_id', messages.update)
    .delete('/messages/:message_id', messages.delete)
    .get('/messages/', messages.list)
    .delete('/messages/', messages.clear)
}

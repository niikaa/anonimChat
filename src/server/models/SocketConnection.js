const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SocketConnectionSchema = new Schema({
  fb_id: {
    type: String,
  },
  socket_id: {
    type: String,
  }
})

module.exports = mongoose.model('socket_connections', SocketConnectionSchema);

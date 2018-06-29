const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Conversation = new Schema({
  chat_type_initiator: {
    type: String,
  },
  initiator_id: {
    type: String,
  },
  initiator_gender: {
    type: String,
  },
  chat_type_target: {
    type: String,
  },
  target_id: {
    type: String,
  },
  target_gender: {
    type: String,
  },
  date: {
    type : Date,
    default: Date.now()
  },
  messages: [{
    sender_id: {
      type: String
    },
    chat_message: {
      type: String
    },
    date: {
      type: Date
    },
    seen: {
      type: Boolean
    }
  }]
})

module.exports = mongoose.model('conversations', Conversation);

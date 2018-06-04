const SocketConnection = require('../models/SocketConnection');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Conversation = require('../models/Conversation')

router.post('/create_new_conversation', (req, res)=>{
  let newConv = new Conversation();
  newConv.chat_type_initiator = req.body.data.chat_type_initiator
  newConv.initiator_id = req.body.data.initiator_id
  newConv.chat_type_target = req.body.data.chat_type_target
  newConv.target_id = req.body.data.target_id
  newConv.save().then(savedConv => {
    if (savedConv) {
      res.send({status: 200, data: savedConv})
    } else {
      res.send({status: 500})
    }
  })
})

router.post('/add_message', (req, res)=>{
  const conversation_id = req.body.data.conversation_id
  let newMsg = {
    sender_id: req.body.data.sender_id,
    chat_message: req.body.data.chat_message,
    date: req.body.data.date
  }
  Conversation.findOneAndUpdate({_id: new mongoose.mongo.ObjectId(conversation_id)}, {$push: {messages: newMsg}}, (err, doc) => {
    if (err) {
      res.send({status: 500})
    } else {
      const fb_ids = []
      fb_ids.push(doc.initiator_id)
      fb_ids.push(doc.target_id)
      SocketConnection.find( { fb_id: fb_ids }, (error, result) => {
        if(err){
          res.send({status: 500})                    
        }else{
          res.send({status: 200, message: newMsg, targets: result })          
        }
      })
    }
  })
})

router.get('/get_message', (req, res)=> {

})

module.exports = router

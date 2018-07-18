const SocketConnection = require('../models/SocketConnection');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Conversation = require('../models/Conversation')

router.post('/create_new_conversation', (req, res)=>{
  let newConv = new Conversation();
  newConv.chat_type_initiator = req.body.data.chat_type_initiator
  newConv.initiator_id = req.body.data.initiator_id
  newConv.initiator_gender = req.body.data.initiator_gender
  newConv.chat_type_target = req.body.data.chat_type_target
  newConv.target_id = req.body.data.target_id
  newConv.target_gender = req.body.data.target_gender
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
    date: Date.now(),
    seen: false
  }
  Conversation.findOneAndUpdate({_id: new mongoose.mongo.ObjectId(conversation_id)}, 
                                {
                                  $set: { date: Date.now(), last_message: newMsg },
                                  $push: { messages: newMsg }
                                }, (err, doc) => {
    if (err) {
      res.send({status: 500})
    } else {
      let mySender = req.body.data.sender_id
      let myTarget
      if(req.body.data.sender_id === doc.initiator_id ){
        myTarget = doc.target_id
      }else{
        myTarget = doc.initiator_id;
      }
      SocketConnection.find( { fb_id: mySender }, (itinError, initiatorTargets) => {
        if(itinError){
          res.send({status: 500})                    
        }else{
          SocketConnection.find( { fb_id: myTarget }, (targetError, targetTargets) => {
            if(targetError){
              res.send({status: 500})                    
            }else{
              res.send({status: 200, message: newMsg, initTargets: initiatorTargets, targetTargets: targetTargets})
            }     
          })
        }
      })
    }
  })
})

module.exports = router

const SocketConnection = require('../models/SocketConnection');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Conversation = require('../models/Conversation')

router.post('/create_new_conversation', (req, res)=>{
  let newConv = new Conversation();
  newConv.chat_type_initiarot = req.body.data.chat_type_initiarot
  newConv.initiarot_id = req.body.data.initiarot_id
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
  let newMsg = {
    sender_id: req.body.data.sender_id,
    chat_message: req.body.data.chat_message,
    date: req.body.data.date
  }
})

router.get('/get_message', (req, res)=> {

})

module.exports = router

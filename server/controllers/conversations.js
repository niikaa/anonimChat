const SocketConnection = require('../models/SocketConnection');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Conversation = require('../models/Conversation')

router.get('/get_conversations_green', (req, res)=> {
    const chatName = req.query.chatName
    const id = req.query.fb_id
    Conversation.find({ $and:[
                        {chat_type_initiator:chatName }, 
                        {chat_type_target:chatName},
                        {$or: [ { initiator_id: id }, { target_id: id } ]} 
                        ]}).then(conversations => {
        if(conversations){
            res.send({status: 200, data: conversations})
        }else{
            res.send({status: 500})
        }
    })
})

module.exports = router


const SocketConnection = require('../models/SocketConnection');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Conversation = require('../models/Conversation')

router.get('/get_conversations_green', (req, res)=> {
    const chatName = req.query.chatName
    const id = req.query.fb_id
    const skip = req.query.skip
    const limit = req.query.limit
    Conversation.find({ $and:[
                        {chat_type_initiator:chatName }, 
                        {chat_type_target:chatName},
                        {$or: [ { initiator_id: id }, { target_id: id } ]},
                        {$where: "this.messages.length > 0"}
                        ]}).sort({"date": -1}).skip(parseInt(skip)).limit(parseInt(limit)).then(conversations => {
        if(conversations){
            res.send({status: 200, data: conversations})
        }else{
            res.send({status: 500})
        }
    })
})

router.get('/get_conversation_green', (req, res)=> {
    const id = req.query.conversation_id
    console.log(id)
    Conversation.find({ _id: id }).then(conversation => {
        if(conversation){
            res.send({status: 200, data: conversation})
        }else{
            res.send({status: 500})
        }
    })
})

module.exports = router


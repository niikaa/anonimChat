const SocketConnection = require('../models/SocketConnection');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Conversation = require('../models/Conversation')

router.get('/get_conversation', (req, res)=> {
    const id = req.query.conversation_id
    Conversation.findOne({ _id: new mongoose.mongo.ObjectId(id) }).then(conversation => {
        if(conversation){
            res.send({status: 200, data: conversation})
        }else{
            res.send({status: 500})
        }
    })
})

router.get('/get_messages', (req, res)=> {
    const id = req.query.conversation_id
    let skip = parseInt(req.query.skip)
    let limit = parseInt(req.query.limit)
    Conversation.aggregate([{
        "$match": {
            "_id": new mongoose.mongo.ObjectId(id)
        }
    }, {
        "$project": {
            "_id": 0,
            "messages": {"$size": "$messages"},
        }
    }], function(err, result) {
        let length = parseInt(result[0].messages)
        let newSkip = length - skip - limit;
        let rame = {$slice:[parseInt(newSkip), parseInt(limit)]}
        if(newSkip < 0){
            if(length - skip > 0){
                limit = length - skip
                newSkip = 0
                rame = {$slice:[0, length - skip]}
            }else{
                rame = 0
            }
        }
        Conversation.findOne({ _id: new mongoose.mongo.ObjectId(id) }, {messages:rame}).then(conversation => {
            if(conversation){
                res.send({status: 200, data: conversation})
            }else{
                res.send({status: 500})
            }
        })
    })
})


router.get('/get_notification', (req, res)=> {
    const id = req.query.fb_id
    Conversation.find({ $and: [
        {$or: [{initiator_id: id}, {target_id: id}]},
        {$where: "this.last_message != undefined"},
        {$where: "this.last_message.seen == false && this.last_message.sender_id != " + id}
    ] }).select({"messages": 0}).then(conversations => {
        if(conversations){ 
            res.send({status: 200, data: conversations})
        }else{
            res.send({status: 500})
        }
    })
})

router.post('/open_conversation', (req, res)=> {
    const id = req.body.conversation_id;
    Conversation.findOne({_id: new mongoose.mongo.ObjectId(id)}).then(conv => {
        Conversation.findOneAndUpdate({_id: new mongoose.mongo.ObjectId(id)}, {"last_message.seen": true}).then(conv => {
            if(conv){
                res.send({status: 200})
            }
        })
    })
})

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
                        ]}).select({"messages": 0}).sort({"date": -1}).skip(parseInt(skip)).limit(parseInt(limit)).then(conversations => {
        if(conversations){
            res.send({status: 200, data: conversations})
        }else{
            res.send({status: 500})
        }
    })
})

router.get('/get_conversations_blue', (req, res)=> {
    const chatName = req.query.chatName
    const id = req.query.fb_id
    const skip = req.query.skip
    const limit = req.query.limit
    Conversation.find({ $and:[
                        {$or: [
                            {$and:[{chat_type_initiator:chatName }, { initiator_id: id } ]},
                            {$and:[{chat_type_target:chatName}, { target_id: id } ]}
                        ]},
                        {$where: "this.messages.length > 0"}
                        ]}).sort({"date": -1}).skip(parseInt(skip)).limit(parseInt(limit)).then(conversations => {
        if(conversations){
            res.send({status: 200, data: conversations})
        }else{
            res.send({status: 500})
        }
    })
})

router.get('/get_conversations_red', (req, res)=> {
    const chatName = req.query.chatName
    const id = req.query.fb_id
    const skip = req.query.skip
    const limit = req.query.limit
    Conversation.find({ $and:[
                        {$or: [
                            {$and:[{chat_type_initiator:chatName }, { initiator_id: id } ]},
                            {$and:[{chat_type_target:chatName}, { target_id: id } ]}
                        ]},
                        {$where: "this.messages.length > 0"}
                        ]}).sort({"date": -1}).skip(parseInt(skip)).limit(parseInt(limit)).then(conversations => {
        if(conversations){
            res.send({status: 200, data: conversations})
        }else{
            res.send({status: 500})
        }
    })
})

module.exports = router


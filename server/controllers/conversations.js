const SocketConnection = require('../models/SocketConnection');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Conversation = require('../models/Conversation')

router.get('/get_conversation', (req, res)=> {
    const id = req.query.conversation_id
    Conversation.find({ _id: id }).then(conversation => {
        if(conversation){
            res.send({status: 200, data: conversation})
        }else{
            res.send({status: 500})
        }
    })
})

router.get('/get_notification', (req, res)=> {
    const id = req.query.fb_id
    Conversation.find({ $and: [
        {$or: [{initiator_id: id}, {target_id: id}]},
        {$where: "this.messages.length > 0"}
    ] }).then(conversation => {
        if(conversation){ 

            res.send({status: 200, data: conversation})
        }else{
            res.send({status: 500})
        }
    })
})

router.post('/open_conversation', (req, res)=> {
    const id = req.body.conversation_id;
    Conversation.findOne({_id: new mongoose.mongo.ObjectId(id)}).then(conv => {
        var query = "messages." + (conv.messages.length - 1) + ".seen"
        var update={};
        update[query]=true;
        Conversation.findOneAndUpdate({_id: new mongoose.mongo.ObjectId(id)}, {$set: update}).then(conv => {
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
                        ]}).sort({"date": -1}).skip(parseInt(skip)).limit(parseInt(limit)).then(conversations => {
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


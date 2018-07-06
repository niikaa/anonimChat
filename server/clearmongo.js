const express = require('express')
const app = express()
const http = require('http').Server(app)
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const SocketConnection = require('./models/SocketConnection')
const Conversation = require('./models/Conversation')


mongoose.connect('mongodb://localhost:27017/anonimChat').then((db)=>{
    mongoose.connection.db.dropDatabase().then(() => {
        process.exit()
    })
}).catch(
    error=>console.log(error)
)
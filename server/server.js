const express = require('express')
const app = express()
const http = require('http').Server(app)
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const io = require('socket.io')(http)

mongoose.connect('mongodb://localhost:27017/anonimChat').then((db)=>{
    console.log("Mongo connected")
}).catch(
    error=>console.log(error)
)

const connections = require('./controllers/connections')
const greenChat = require('./controllers/greenChat')
const conversations = require('./controllers/conversations')

io.on('connection', function(socket){
  let socket_id = socket.id
  socket.on('disconnect', () => {
    connections.removeSocketConnection({socket_id: socket_id})
  })
  socket.on('SET_CONNECTION', (data) => {
    connections.setConnection({...data, socket_id: socket_id})
  })
  socket.on('REMOVE_CONNECTION', (data) => {
    connections.removeConnection({...data})
  })
  socket.on('SEND_GREEN_CHAT_MESSAGE', (data) => {
    data.targets.forEach(element => {
        io.to(element.socket_id).emit('GREEN_CHAT_MSG_RECEIVE', data.message)
    })
  })
})

http.listen(3000, () => {
    console.log("Listen on 8080 port")
})

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/connections', connections.router)
app.use('/green_chat', greenChat)
app.use('/conversations', conversations)

const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const io = require('socket.io')(http);

mongoose.connect('mongodb://localhost:27017/anonimChat').then((db)=>{
    console.log("Mongo connected");
}).catch(
    error=>console.log(error)
);

io.on('connection', function(socket){

})

http.listen(3000, () => {
    console.log("Listen on 8080 port");
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,access_token');
    // res.setHeader('Cache-Control', 'public, max-age=360000000000000');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

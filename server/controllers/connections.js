const SocketConnection = require('../models/SocketConnection');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

function setConnection(data) {
  const fb_id = data.fb_id
  const socket_id = data.socket_id
  let newConnection = new SocketConnection()
  newConnection.fb_id = fb_id
  newConnection.socket_id = socket_id
  newConnection.save().then(savedConnection => {
    if (savedConnection) {
      return {status: 200, data: savedConnection}
    } else {
      return {status: 500}
    }
  })
}

function removeConnection(data) {
  const fb_id = data.fb_id
  SocketConnection.remove({fb_id: fb_id}, (err) => {
    if (err) {
      return {status: 200}
    } else {
      return {status: 500}
    }
  })
}

function removeSocketConnection(data) {
  const socket_id = data.socket_id
  SocketConnection.remove({socket_id: socket_id}, (err) => {
    if (err) {
      return {status: 200}
    } else {
      return {status: 500}
    }
  })
}


//gasatestia es callebi jer
router.post('/set_connection', (req, res)=>{
  // const resp = setConnection(req.body.params)
  // res.send({...resp})
})

router.post('/remove_connection', (req, res)=>{
  // const resp = removeConnection(req.body.params)
  // res.send({...resp})
})

router.get('/active_friends', (req, res)=>{
  const friends = req.query.friends
  SocketConnection.find({fb_id: {$in: friends}}).then(activeFriends => {
    res.send({status: 200, data: activeFriends})
  })
})

module.exports = {
  router,
  setConnection,
  removeConnection,
  removeSocketConnection
}

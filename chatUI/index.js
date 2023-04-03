const express = require('express');
const http = require('http');
const io = require('socket.io');
const path = require('path');

const app = express();

const server = http.createServer(app);
const socketIo = io(server);

app.use(express.static(path.join(__dirname, 'public')));

socketIo.on('connection', socket => {
  console.log('got a connection');

  socket.on('newUser', username =>{
    socket.broadcast.emit('update', `${username} joined the chat`)
  });

  socket.on('exitUser', username =>{
    socket.broadcast.emit('update', `${username} left the chat`)
  });

  socket.on('chat', msg => {
    socket.broadcast.emit('groupMsg', msg);
  });

});


server.listen(80);

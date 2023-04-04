(function () {
  'use strict';

  const display = document.querySelector('#display');
  const input = document.querySelector('#chat-form');
  const messageInput = document.querySelector('#message');
  const usernameInput = document.querySelector('#username');
  let username;

  const socket = io();


  //Save username when enter chat and send to server
  document.querySelector('#join-button').addEventListener('click', () => {
    username = usernameInput.value;
    if (username.length == 0) {
      return;
    }
    socket.emit('newUser', username);
    document.querySelector('.join-screen').classList.remove('active');
    document.querySelector('.chat-screen').classList.add('active');
  });


  //when send message, create a message and send to server
  input.addEventListener('submit', e => {
    e.preventDefault();
    let msg = messageInput.value;
    if (msg.length == 0) {
      return
    }
    createMessage('my', {
      username: username,
      text: msg
    });

    socket.emit('chat', {
      username: username,
      text: msg
    });
    messageInput.value = "";
  });


  //exit button handler
  document.querySelector('#exit').addEventListener('click', () => {
    socket.emit('exitUser', username);
    window.location.href = window.location.href;
  });


  //what to do with server messages
  socket.on('update', update => {
    createMessage('update', update);
  });

  socket.on('groupMsg', chat => {
    createMessage('other', chat);
  });


  //function to create messages
  function createMessage(type, message) {
    if (type == 'my') {
      const el = document.createElement('div');
      el.innerText = `You: ${message.text}`;
      el.className = "msg myMsg";
      display.append(el);
    } else if (type == 'other') {
      const el = document.createElement('div');
      el.innerText = `${message.username}: ${message.text}`;
      el.className = "msg otherMsg";
      display.append(el);
    } else if (type == 'update') {
      const el = document.createElement('div');
      el.innerText = message;
      el.className = "updateMsg";
      display.append(el);
    }
    display.scrollTop = display.scrollHeight - display.clientHeight;
  }
})();

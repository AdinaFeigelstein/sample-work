(function () {
  'use strict';

  const display = document.querySelector('#display');
  const input = document.querySelector('#chat-form');
  const messageInput = document.querySelector('#message');
  const usernameInput = document.querySelector('#username');
  let username;

  const socket = io();

  document.querySelector('#join-button').addEventListener('click', () => {
    username = usernameInput.value;
    if (username.length == 0) {
      return;
    }
    socket.emit('newUser', username);
    document.querySelector('.join-screen').classList.remove('active');
    document.querySelector('.chat-screen').classList.add('active');
  });

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

  document.querySelector('#exit').addEventListener('click', () => {
    socket.emit('exitUser', username);
    window.location.href = window.location.href;
  });

  socket.on('update', update => {
    createMessage('update', update);
  });

  socket.on('groupMsg', chat => {
    createMessage('other', chat);
  });

  function createMessage(type, message) {
    if (type == 'my') {
      const el = document.createElement('div');
      el.innerText = `You: ${message.text}`;
      el.className = "myMsg";
      display.append(el);
    } else if (type == 'other') {
      const el = document.createElement('div');
      el.innerText = `${message.username}: ${message.text}`;
      el.className = "otherMsg";
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

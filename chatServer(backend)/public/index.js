(function () {
  'use strict';

  const display = document.querySelector('#display');
  const input = document.querySelector('#inputForm');
  const message = document.querySelector('#input');

  const socketIo = io();

  input.addEventListener('submit', e => {
    e.preventDefault();
    const clientMsg = document.createElement('div');
    clientMsg.innerText = `${message.value}`;
    clientMsg.className = "clientMsg";
    display.append(clientMsg);
    socketIo.emit('clientMsg', `${message.value}`);
    input.value = "";
  })

  socketIo.on('groupMsg', msg => {
    const serverMsg = document.createElement('div');
    serverMsg.innerText = msg;
    serverMsg.className = "serverMsg";
    display.append(serverMsg);
  });

})();

(function () {
  'use strict';

  const CELL_SIZE = 64;

  const canvas = document.querySelector('#theCanvas');
  function resizeCanvas() {
    canvas.width = (window.innerWidth - 2) - ((window.innerWidth - 2) % CELL_SIZE);
    canvas.height = (window.innerHeight - 2) - ((window.innerHeight - 2) % CELL_SIZE);
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const context = canvas.getContext('2d');

  const crashSound = document.querySelector('#crash');
  const crunchSound = document.querySelector('#crunch');
  const pause = document.querySelector('#pause');

  let snakeTail = [];
  const snakeHead = new Image();
  snakeHead.src = "images/snakehead.png";

  let speed = 650;
  let score = 0;

  //Snake info
  class Snake {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.draw();
    }
    draw() {
      context.drawImage(snakeHead, this.x, this.y);
      context.fillStyle = 'green';
      context.strokeStyle = 'darkgreen';
      context.lineWidth = 3;
      snakeTail.forEach(part => {
        context.rect(part.x, part.y, CELL_SIZE, CELL_SIZE);
        context.fill();
        context.stroke();
      });
    }
    move() {
      let x = this.x;
      let y = this.y;
      let tempX = this.x;
      let tempY = this.y;

      switch (direction) {
        case 'ArrowUp':
          y -= CELL_SIZE;
          break;
        case 'ArrowRight':
          x += CELL_SIZE;
          break;
        case 'ArrowDown':
          y += CELL_SIZE;
          break;
        case 'ArrowLeft':
          x -= CELL_SIZE;

          break;
      }


      if (x < 0 || x > canvas.width - CELL_SIZE
        || y < 0 || y > canvas.height - CELL_SIZE) {
        gameOver = true;
      }
      snakeTail.forEach(part => {
        if (x === part.x && y === part.y) {
          gameOver = true;
        }
      });


      if (!gameOver) {
        this.x = x;
        this.y = y;

        if (this.x === apple.x && this.y === apple.y) {
          score++;
          speed = speed - (speed * 0.10);
          crunchSound.currentTime = 0;
          crunchSound.play();
          apple.move();
          snakeTail.unshift({ x: tempX, y: tempY });
        } else {
          snakeTail.unshift({ x: tempX, y: tempY });
          snakeTail.pop();
        }
      }
      this.draw();
    }
  }


  //apple info
  class Apple {
    constructor() {
      this.move();
    }

    draw() {
      context.drawImage(appleImg, this.x, this.y);
    }

    move() {
      this.x = Apple.getRandomNumber(0, canvas.width - 1);
      this.y = Apple.getRandomNumber(0, canvas.height - 1);
      snakeTail.forEach(part => {
        if (this.x === part.x && this.y === part.y) {
          this.x = Apple.getRandomNumber(0, canvas.width - 1);
          this.y = Apple.getRandomNumber(0, canvas.height - 1);
        }
        else {
          this.draw();
        }
      });

    }
    static getRandomNumber(min, max) {
      let r = Math.floor(Math.random() * ((max - min) + 1)) + min;
      return r - r % CELL_SIZE;
    }
  }

  //pause/resume functionality
  let paused = false;
  pause.addEventListener('click', () => {
    if (!paused) { paused = true; }
    else {
      paused = false;
      pause.innerText = "Pause";
      setTimeout(gameLoop, speed);
    }

  });

  //play game
  function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.move();
    apple.draw();
    context.beginPath();
    context.font = 'bold 32px Arial';
    context.fillStyle = '#ff0000';
    context.fillText(`Score ${score}`, canvas.width - 160, 40);
    if (!gameOver && !paused) {
      setTimeout(gameLoop, speed);
    }
    else {
      if (paused) {
        pause.innerText = "Resume";

      } else {
        crashSound.currentTime = 0;
        crashSound.play();
        context.font = 'bold 64px Arial';
        context.fillStyle = '#000000';
        context.fillText(`GAME OVER!!!`, (canvas.width / 2) - 160, (canvas.height / 2) - 32);
      }
    }

  }

  let snake;
  let gameOver = false;
  snakeHead.onload = () => {
    snake = new Snake();
    setTimeout(gameLoop, speed);
  };

  const appleImg = new Image();
  appleImg.src = 'images/redapple.png';
  let apple = new Apple();
  appleImg.onload = () => {
    apple.draw();
  };

  let direction = 'ArrowRight';
  document.addEventListener('keydown', e => {
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowRight':
      case 'ArrowDown':
      case 'ArrowLeft':
        direction = e.key;
        break;
    }
  });
}());
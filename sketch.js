let leftPaddle;
let rightPaddle;
let ball;
let leftScore = 0;
let rightScore = 0;
let gameOver = false;
let ballSpeed = 5;
let gameStarted = false;
let startButton;
let ballSpeedIncrement = 1; 

function setup() {
  createCanvas(600, 400);
  leftPaddle = new Paddle(true);
  rightPaddle = new AIPaddle(false);
  ball = new Ball();
  noLoop();
  createMenu();
}

function draw() {
  background(0);

  if (gameStarted) {
    if (gameOver) {
      displayGameOver();
    } else {
      leftPaddle.show();
      leftPaddle.update();

      rightPaddle.show();
      rightPaddle.update(ball);

      ball.show();
      ball.update();
      ball.edges();

      leftPaddle.checkCollision(ball);
      rightPaddle.checkCollision(ball);

      if (ball.isOut()) {
        if (ball.x < 0) {
          rightScore++;
        } else {
          leftScore++;
        }
        ballSpeedIncrement += 1; // Incrementa a velocidade da bola a cada tacada
        ball.reset();
      }

      if (leftScore >= 5 || rightScore >= 5) {
        gameOver = true;
      }

      displayScores();

      leftPaddle.move();
    }
  }
}

function createMenu() {
  background(0);
  textSize(64);
  fill(255); // Defina a cor do texto como branco
  textAlign(CENTER, CENTER);
  text("PONG", width / 2, height / 2 - 50);
  textSize(24);
  text("por Augusto Byczkovski", width / 2, height / 2 + 20);
  startButton = createButton('Start');
  startButton.position(width / 2 - startButton.width / 2, height / 2 + 50);
  startButton.mousePressed(startGame);
}

function startGame() {
  gameStarted = true;
  loop();
  startButton.remove(); // Remove o botão "Start" quando o jogo começa
}

function displayScores() {
  textSize(32);
  fill(255);
  text(leftScore, width / 4, 50);
  text(rightScore, (3 * width) / 4, 50);
}

function displayGameOver() {
  textSize(64);
  fill(255);
  text("Game Over", width / 2, height / 2 - 50);
  textSize(32);
  text("Pressione ESPAÇO para reiniciar", width / 2, height / 2 + 20);
}

function keyPressed() {
  if (keyCode === 32 && gameOver) {
    resetGame();
  }
}

function resetGame() {
  gameOver = false;
  leftScore = 0;
  rightScore = 0;
  ballSpeed = 5;
  ballSpeedIncrement = 1; // Redefine o incremento da velocidade da bola
  ball.reset();
  noLoop();
  createMenu();
}

class Paddle {
  constructor(isLeft) {
    this.w = 10;
    this.h = 80;
    this.y = height / 2 - this.h / 2;
    if (isLeft) {
      this.x = 0;
    } else {
      this.x = width - this.w;
    }
    this.ySpeed = 0;
  }

  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }

  update() {
    this.y += this.ySpeed;
    this.y = constrain(this.y, 0, height - this.h);
  }

  move() {
    if (keyIsDown(UP_ARROW)) {
      this.ySpeed = -5; // Seta para cima
    } else if (keyIsDown(DOWN_ARROW)) {
      this.ySpeed = 5; // Seta para baixo
    } else {
      this.ySpeed = 0;
    }
  }

  checkCollision(ball) {
    if (
      ball.x + ball.radius > this.x &&
      ball.x - ball.radius < this.x + this.w &&
      ball.y + ball.radius > this.y &&
      ball.y - ball.radius < this.y + this.h
    ) {
      ball.xSpeed *= -1;
      ball.xSpeed = Math.sign(ball.xSpeed) * (ballSpeed + ballSpeedIncrement); // Incrementa a velocidade da bola
    }
  }
}

class AIPaddle {
  constructor(isLeft) {
    this.w = 10;
    this.h = 80;
    this.y = height / 2 - this.h / 2;
    if (isLeft) {
      this.x = 0;
    } else {
      this.x = width - this.w;
    }
    this.ySpeed = 0;
    this.speed = 5; // Velocidade da raquete da IA
  }

  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }

  update(ball) {
    // Calcula a posição vertical da raquete da IA com base na posição da bola
    const targetY = ball.y - this.h / 2;

    // Aplica suavização para evitar movimentos bruscos da raquete da IA
    this.y = lerp(this.y, targetY, 0.1);

    this.y = constrain(this.y, 0, height - this.h);
  }

  checkCollision(ball) {
    if (
      ball.x + ball.radius > this.x &&
      ball.x - ball.radius < this.x + this.w &&
      ball.y + ball.radius > this.y &&
      ball.y - ball.radius < this.y + this.h
    ) {
      ball.xSpeed *= -1;
      ball.xSpeed = Math.sign(ball.xSpeed) * (ballSpeed + ballSpeedIncrement); // Incrementa a velocidade da bola
    }
  }
}

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.radius = 10;
    this.xSpeed = ballSpeed;
    this.ySpeed = ballSpeed;
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.radius * 2);
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  edges() {
    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
    }
  }

  isOut() {
    return this.x < 0 || this.x > width;
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = ballSpeed;
    this.ySpeed = ballSpeed;
  }
}

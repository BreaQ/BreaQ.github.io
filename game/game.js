const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 720;
const keys = [];
ctx.font = "30px Impact";

//
const player = {
  x: 20,
  y: 400,
  width: 40,
  height: 40,
  grav: 9,
  speed: 15,
};

const ground = {
  x: 0,
  y: 660,
  width: 2000,
  height: 60,
};

/* topy = top border, with score and hp count */
const topy = {
  x: 0,
  y: 0,
  width: 2000,
  height: 60,
};

let timeToNextFrog = 0;
let frogInterval = 500;
let lastTime = 0;
let score = 0;
let hp = 3;
let point = 60 / 10000;

/* function to count score (how much time did you survived until hp =0 */

function drawScore() {
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + parseInt(score), canvas.width / 2 - 30, 40);
  if (hp != 0) score += point;
}

/* function to count lives (hp) and also add 1 life every x time survived */

function drawHp() {
  ctx.fillStyle = "white";
  ctx.fillText("HP: " + parseInt(hp), 60, 40);
}

/* function to fire shots at frgos, and delete them if they touch frog */

/* frogs - draws multiple frog objects with diffirent size, speed and y. move them to left side, and if they reach x=0 they dissapear. */
let frogs = [];
class Frog {
  constructor() {
    this.spriteWidth = 340;
    this.spriteHeight = 377;
    this.sizeModifier = Math.random() * 0.2 + 0.1;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - (this.height + 50));
    this.directionX = Math.random() * 5 + 3;
    this.markedForDelete = false;
    this.image = new Image();
    this.image.src = "../images/frog.png";
    this.frame = 0;
    this.maxFrame = 5;
  }
  update() {
    this.x -= this.directionX;
    if (this.x < 0 - this.width || this.y < 60) this.markedForDelete = true;
    if (this.frame > this.maxFrame) {
      this.frame = 0;
    } else {
      this.frame++;
    }
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

//placeholder to draw player and ground //
function drawHero() {
  ctx.fillStyle = "black";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}
function drawGround() {
  ctx.fillStyle = "black";
  ctx.fillRect(ground.x, ground.y, ground.width, ground.height);
}

function drawTopy() {
  ctx.fillStyle = "black";
  ctx.fillRect(topy.x, topy.y, topy.width, topy.height);
}

/* kind of gravity - constantly moves object down up to "groud Y" */
function gravity() {
  if (player.y < ground.y - player.height) {
    player.y += player.grav;
  }
}

/* in moment of keydown it adds it to keys variable, to read movement. Also if keyup it deletes it from variable */
window.addEventListener("keydown", function (e) {
  keys[e.keyCode] = true;
});
window.addEventListener("keyup", function (e) {
  delete keys[e.keyCode];
});

// graczem
function movePlayer() {
  // lewo
  if (keys[37] && player.x >= 0) {
    player.x -= player.speed;
  }
  // prawo
  if (keys[39] && player.x <= canvas.width - player.width) {
    player.x += player.speed;
  }
  //góra
  if (keys[38] && player.y >= 60) {
    player.y -= player.speed;
  }
}

//gameloop
function animate(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  timeToNextFrog += deltaTime;
  if (timeToNextFrog > frogInterval) {
    frogs.push(new Frog());
    timeToNextFrog = 0;
  }
  [...frogs].forEach((object) => object.update());
  [...frogs].forEach((object) => object.draw());
  frogs = frogs.filter((object) => !object.markedForDelete);
  drawGround();
  drawHero();
  drawTopy();
  drawScore();
  movePlayer();
  gravity();
  drawHp();
  drawScore();
  requestAnimationFrame(animate);
}
animate(0);

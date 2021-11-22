const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 1280;
const CANVAS_HEIGHT = canvas.height = 720;
let gameSpeed = 1;
const keys = [];
let playerState = "idle";

const ground = {
    x: 0,
    y: 605,
  };

// mainscreen showing instrudtions. PLACEHOLDER !!
window.addEventListener('load', menu);
function menu (){
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

//background moving like parallax
const backgroundLayer1 = new Image();
backgroundLayer1.src = './images/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = '/images/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = '/images/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = '/images/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = '/images/layer-5.png';
// enemies sprites
const ravenEnemie = new Image();
ravenEnemie.src = './images/raven.png';
// boom sprite
const boom = new Image();
boom.src = './images/boom.png';

//player sprite
const playerimg = new Image();
playerimg.src = './images/player.png';

//player controls, sprites anim etc
let player = {
    x: 50,
    y: 450,
    width: 85,
    height: 115,
    spriteWidth: 45,
    spriteHeight: 75,
    grav: 5,
    speed: 6,
}
let gameFrame = 0;
const staggerFrames = 6;
const playerSpriteAnimations = [];
const playerAnimationStates = [
    {
        name: 'jump',
        frames: 5,
    },
    {
        name: 'punch',
        frames: 3,
    },
    {
        name: 'run',
        frames: 4,
    },
    {
        name: 'idle',
        frames: 4,
    },
    {
        name: 'hit',
        frames: 3,
    },
    {
        name: 'hide',
        frames: 2,
    }
];
playerAnimationStates.forEach((state, index) => {
    let frames = {
        loc: [],

    }
    for (let j = 0; j < state.frames; j++){
        let positionX = j * player.spriteWidth;
        let positionY = index * player.spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    playerSpriteAnimations[state.name] = frames;
})

/* in moment of keydown it adds it to keys variable, to read movement. Also if keyup it deletes it from variable */
window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
  });
  window.addEventListener("keyup", function (e) {
    delete keys[e.keyCode];
    playerState = "idle";

  });
  
  // player
  function movePlayer() {
    // left
    if (keys[37] && player.x >= 0) {
      player.x -= player.speed;
      playerState ="run";
      if (gameSpeed >= 6) {
      gameSpeed -= 5;
      }
    }
    // right
    if (keys[39] && player.x <= (CANVAS_WIDTH + 30)  - player.width) {
      player.x += player.speed;
      playerState ="run";
      if (gameSpeed <= 10) {
        gameSpeed += 5;
        }
    }
    //up
    if (keys[38] && player.y >= 60) {
      player.y -= (player.speed + 10);
      playerState ="jump";
    }
    //down
    if (keys[40]) {
        playerState ="hide";
        if (gameSpeed >= 2 && gameSpeed < 17){
            gameSpeed = 0;
        } else {
            gameSpeed = 1;
        }
    }
  }
  function gravity() {
    if (player.y < ground.y - player.height) {
      player.y += player.grav;
    }
  }
/* check if it works.
console.log(playerAnimationStates);
upprt method builds aray maping animation frames on sprite file whitout empty places.
*/






//background layers
class Layer {
  constructor(image, speedModifier){
      this.x = 0;
      this.y = 0;
      this.width = 2400;
      this.height = 720;
      this.image = image;
      this.speedModifier = speedModifier;
      this.speed = gameSpeed * this.speedModifier;

  }
  update(){
      this.speed = gameSpeed * this.speedModifier;
      if (this.x <= -this.width){
          this.x = 0;
      }
      this.x = Math.floor(this.x - this.speed);
  }
  draw(){
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
  }
}
const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);

const backGround = [layer1, layer2, layer3, layer4, layer5];

// Start Button/restart - restart refreshes the page 
const startButton = document.getElementById("start");
const restartButton = document.getElementById("restart");
restartButton.addEventListener('click', refresh);
function refresh(){
    location.reload();
}


// Score; Time alive; lives board
const liveCount = document.getElementById("lives"),
    timeCount = document.getElementById("time"),
    scoreCount = document.getElementById("score");
    MAXLIVES = 5;
    MINLIVES = 0;



startButton.addEventListener('click', start);


// game engine, paste here all functions.
function start (){
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);     
  backGround.forEach(object => {
      object.update();
      object.draw();
  });
  let position = Math.floor(gameFrame/staggerFrames) % playerSpriteAnimations[playerState].loc.length;
  let frameX = player.spriteWidth * position;
  let frameY = playerSpriteAnimations[playerState].loc[position].y;
  //  ctx.drawImage(image,sx, sy, sw, sh, x, y, width, height);
  ctx.drawImage(playerimg, frameX, frameY, player.spriteWidth, player.spriteHeight, player.x, player.y, player.width, player.height);
  movePlayer();
  gravity();
  gameFrame++;
  requestAnimationFrame(start);
  startButton.disabled = true;

};
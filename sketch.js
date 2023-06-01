let width = 400;
let height = 400;

let bird;
let birdImg;
let pipe1Img;
let pipe2Img;

let doublePipes = [];
let counter = 1;
let score = 0;

let backgrounds = [];
let backgroundImg;

let vel;
let start = false;
let startBtn;

function preload() {
  birdImg = loadImage('img/bird.png');
  pipe1Img = loadImage('img/CandyBar1w50.png');
  pipe2Img = loadImage('img/CandyBar2w50.png');
  backgroundImg = loadImage('img/background.PNG');
}

function setup() {
  createCanvas(width, height);
  background(0);
  newGame();


  textSize(32);
  showStartScreen();
}


function draw() {
  if (start) {
    for (var bg of backgrounds) {
      bg.update(vel);
      bg.show();
    }
    for (var pipe of doublePipes) {
      pipe.show();
    }
    bird.show();
    bird.edges(height);
    bird.update();
    bird.gravity();

    for (var pipe of doublePipes) {
      pipe.update(bird, vel);
    }

    text(score, width - 50, 30);
  }
  if (bird.dead) {
    start = false;
    showStartScreen();
  }
}

function showStartScreen() {
  for (var bg of backgrounds) {
    bg.show();
  }
  for (var pipe of doublePipes) {
    pipe.show();
  }
  bird.show();

  fill(200, 200, 200, 150);
  noStroke();
  rect(0, 0, width, height);
  fill(0);
  textAlign(CENTER, CENTER)
  text("Neues Spiel:", width / 2, 100);
  startBtn = new Button("Start", width / 2, height / 2);
  startBtn.show();
}


function newGame() {
  doublePipes = [];
  backgrounds = [];

  counter = 1;
  score = 0;

  bird = new Bird(50, height / 2, birdImg);
  doublePipes.push(new DoublePipe(width, 0, height, pipe1Img));
  backgrounds.push(new Background(0, 0, backgroundImg, height));

  let lastBg = backgrounds.slice(-1)[0];
  backgrounds.push(new Background(lastBg.pos.x + lastBg.img.width, 0, backgroundImg, height));
  vel = createVector(-1, 0);
}

function createDoublePipe() {
  vel.x -= 0.1;
  counter++;
  if (counter % 2 == 0) {
    doublePipes.push(new DoublePipe(width, 0, height, pipe2Img));
  } else {
    doublePipes.push(new DoublePipe(width, 0, height, pipe1Img));
  }
  let lastBg = backgrounds.slice(-1)[0];
  backgrounds.push(new Background(lastBg.pos.x + lastBg.img.width, 0, backgroundImg, height));
}

function mousePressed() {
  if (start) {
    bird.applyForce(createVector(0, -4));
  } else {
    if (startBtn.clicked()) {
      start = true;
      newGame();
    }
  }
}
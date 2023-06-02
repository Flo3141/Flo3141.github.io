let width = 400;
let height = 400;

let bird;
let charImgs = [];
let characterObjects = [];

let pipe1Img;
let pipe2Img;

let doublePipes = [];
let counter = 1;
let score = 0;
let highscore;

let backgrounds = [];
let backgroundImg;

let vel;
let start = false;
let charSelection = false;
let startBtn;

function preload() {
  // Player Charactere:
  for (var i = 1; i <= 5; i++) {
    charImgs.push(loadImage('img/char' + i + '.png'))
  }

  pipe1Img = loadImage('img/CandyBar1w50.png');
  pipe2Img = loadImage('img/CandyBar2w50.png');
  backgroundImg = loadImage('img/background.PNG');
}

function setup() {
  createCanvas(width, height);
  background(0);
  doublePipes.push(new DoublePipe(width, 0, height, pipe1Img));
  backgrounds.push(new Background(0, 0, backgroundImg, height));

  let lastBg = backgrounds.slice(-1)[0];
  backgrounds.push(new Background(lastBg.pos.x + lastBg.img.width, 0, backgroundImg, height));
  bird = new Bird(50, height / 2, charImgs[0], createVector(0, 0));

  console.log(charImgs);

  if (localStorage.getItem("highscore") == null) {
    highscore = 0;
    localStorage.setItem("highscore", highscore);
  } else {
    highscore = localStorage.getItem("highscore");
  }

  let xpos = 0;
  for (var i = 0; i < charImgs.length; i++) {
    characterObjects.push(new Character(xpos, height / 2, charImgs[i]));
    xpos += 20 + charImgs[i].width;
  }

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

    textAlign(LEFT, TOP);
    fill(255);
    let offset = 17;
    offset *= score.toString().length;
    text("Score: " + score, width - offset - 101, 0);
    fill(255, 0, 0);
    text("Highscore: " + highscore, 0, 0);
  }
  if (bird.dead) {
    console.log("Bird dead");
    start = false;
    showStartScreen();
  }
}

function showStartScreen() {
  console.log("No Loop");
  noLoop();
  for (var bg of backgrounds) {
    bg.show();
  }
  for (var pipe of doublePipes) {
    pipe.show();
  }

  fill(200, 200, 200, 150);
  noStroke();
  rectMode(CORNER)
  rect(0, 0, width, height);
  fill(0);
  textAlign(CENTER, CENTER);
  text("Neues Spiel:", width / 2, 100);
  startBtn = new Button("Start", width / 2, height / 2);
  startBtn.show();
}

function selectCharacter() {
  console.log("selectCharacter");
  for (var bg of backgrounds) {
    bg.show();
  }
  for (var pipe of doublePipes) {
    pipe.show();
  }
  fill(200, 200, 200, 150);
  noStroke();
  rect(0, 0, width, height);
  fill(0);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  text("Bitte einen Charakter auswählen: ", width / 2, 100, width);

  for (var char of characterObjects) {
    char.show();
  }
}


function newGame(choice) {
  doublePipes = [];
  backgrounds = [];

  counter = 1;
  score = 0;

  // Die zwei Bären
  let offset = createVector(0, 0);

  if (choice == 2) {
    // Die Wolke
    offset = createVector(-10, 0);
  } else if (choice == 3) {
    // Jaemin
    offset = createVector(-17, 0);
  } else if (choice == 4) {
    // Pokemon
    offset = createVector(-15, -10);
  }


  bird = new Bird(50, height / 2, charImgs[choice], offset);
  doublePipes.push(new DoublePipe(width, 0, height, pipe1Img));
  backgrounds.push(new Background(0, 0, backgroundImg, height));

  let lastBg = backgrounds.slice(-1)[0];
  backgrounds.push(new Background(lastBg.pos.x + lastBg.img.width, 0, backgroundImg, height));
  vel = createVector(-2, 0);
  loop();
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
  } else if (charSelection) {
    let choice = null;
    for (var i = 0; i < characterObjects.length; i++) {
      let elt = characterObjects[i]
      if (mouseX > elt.pos.x && mouseX < elt.pos.x + elt.width && mouseY > elt.pos.y && mouseY < elt.pos.y + elt.height) {
        choice = i;
      }
    }

    console.log(choice);

    if (choice != null) {
      charSelection = false;
      start = true;
      newGame(choice);
    }

  } else if (!start && !charSelection) {
    if (startBtn.clicked()) {
      charSelection = true;
      selectCharacter();
    }
  }
}
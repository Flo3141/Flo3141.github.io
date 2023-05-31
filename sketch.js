let width = 800;
let height = 400;
let bird;
let doublePipes = [];
let counter = 0;
let score = 0;

let vel;

function setup() {
  createCanvas(width, height);
  background(0);
  bird = new Bird(50, height / 2);
  doublePipes.push(new DoublePipe(width, 0, height, counter));
  vel = createVector(-1, 0);
  textSize(32);
}

function draw() {
  background(0);
  for (var pipe of doublePipes) {
    pipe.show();
  }
  bird.show();
  if (!bird.dead) {
    bird.edges(height);
    bird.update();
    bird.gravity();

    for (var pipe of doublePipes) {
      pipe.update(bird, vel);
    }
  }
  text(score, width - 50, 30);
  console.log(vel);
}

function createDoublePipe() {
  vel.x -= 0.1;
  doublePipes.push(new DoublePipe(width, 0, height));
  console.log(counter);
}

function mousePressed() {
  bird.applyForce(createVector(0, -2));
}

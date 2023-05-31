class Bird {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();

    this.r = 16;

    this.dead = false;
  }

  show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  edges(height) {
    if (this.pos.y - this.r < 0 || this.pos.y + this.r > height) {
      this.dead = true;
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  gravity() {
    this.applyForce(createVector(0, 0.1))
  }
}
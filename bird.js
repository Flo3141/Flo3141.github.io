class Bird {
  constructor(x, y, img, offset) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();

    this.imgOffset = offset;

    this.r = 24;
    this.img = img;

    this.dead = false;
  }

  show() {
    //fill(0, 255, 0);
    //ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    image(this.img, this.pos.x - this.r + this.imgOffset.x, this.pos.y - this.r + this.imgOffset.y);
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
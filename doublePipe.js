class DoublePipe {
  constructor(x, y, totalHeight) {
    this.pos = createVector(x, y);
    this.gap = 100;
    this.width = 50;

    this.upperHeight = random(50, totalHeight - this.gap - 10);
    this.lowerHeight = totalHeight - this.upperHeight - this.gap;
    this.upper = new Pipe(this.pos.x, this.pos.y, this.width, this.upperHeight);
    this.lower = new Pipe(this.pos.x, this.pos.y + this.upperHeight + this.gap, this.width, this.lowerHeight);

    this.totalWidth = x;
    this.distance = 300;
    this.createdNextPipe = false;
    this.updateScore = false;
  }

  update(bird, vel) {
    this.pos.add(vel);
    if (this.pos.x < this.totalWidth - this.distance && !this.createdNextPipe) {
      createDoublePipe();
      this.createdNextPipe = true;
    }
    this.upper.pos.x = this.pos.x;
    this.lower.pos.x = this.pos.x;
    if (this.upper.collide(bird) || this.lower.collide(bird)) {
      bird.dead = true;
    }
    if (bird.pos.x > this.pos.x + this.width && !this.updateScore) {
      this.updateScore = true;
      score++;
    }
  }

  show() {
    this.upper.show();
    this.lower.show();
  }
}
class Background {
  constructor(x, y, img, height) {
    this.pos = createVector(x, y);
    this.img = img;
    this.img.resize(0, height)
  }

  update(vel) {
    this.pos.add(vel);
  }

  show() {
    image(this.img, this.pos.x, this.pos.y);
  }
}
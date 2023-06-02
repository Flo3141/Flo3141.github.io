class Character {
  constructor(x, y, img) {
    this.pos = createVector(x, y);
    this.width = img.width;
    this.height = img.height;
    this.img = img;
  }

  show() {
    image(this.img, this.pos.x, this.pos.y);
  }
}
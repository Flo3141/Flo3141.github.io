class Button {
  constructor(text, x, y) {
    this.pos = createVector(x, y);
    this.width = 100;
    this.height = 50;
    this.text = text;
  }

  show() {
    fill(0);
    stroke(255);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.width, this.height);
    fill(255);
    text(this.text, this.pos.x, this.pos.y);
    rectMode(CORNER);
  }

  clicked() {
    return (mouseX > this.pos.x - this.width / 2 && mouseX < this.pos.x + this.width / 2 && mouseY > this.pos.y - this.height / 2 && mouseY < this.pos.y + this.height / 2);
  }
}
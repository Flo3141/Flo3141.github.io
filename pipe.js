class Pipe {
  constructor(x, y, w, h) {
    this.pos = createVector(x, y);
    this.width = w;
    this.height = h;

    this.distance = 300;
    this.createdNextPipe = false;


  }

  show(x) {
    fill(0, 255, 0);
    rect(this.pos.x, this.pos.y, this.width, this.height)
  }

  collide(bird) {
    this.centerPos = createVector(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
    let circleDistanceY = abs(bird.pos.y - this.centerPos.y);
    let circleDistanceX = abs(bird.pos.x - this.centerPos.x);

    if (circleDistanceX > (this.width / 2 + bird.r)) {
      return false;
    }
    if (circleDistanceY > (this.height / 2 + bird.r)) {
      return false;
    }

    if (circleDistanceX <= (this.width / 2)) {
      return true;
    }
    if (circleDistanceY <= (this.height / 2)) {
      return true;
    }

    let cornerDistance_sq = (circleDistanceX - this.width / 2) * (circleDistanceX - this.width / 2) + (circleDistanceY - this.height / 2) * (circleDistanceY - this.height / 2);

    return (cornerDistance_sq <= (bird.r * bird.r));
  }
}
class ThrowableObject extends MovableObject {
  constructor(x, y) {
    super().loadImage('assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 80;
    this.trow()
  }

  trow() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }
}
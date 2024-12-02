class Bottle extends DrawableObject {
  world;
  y = 360;
  width = 65;
  height = 65;
  offset = {
    top: 0,
    left: 20,
    right: 20,
    bottom: 0
};

  constructor() {
    super();
    this.loadImage('assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
    this.x = 200 + Math.random() * 2000;
  }
}
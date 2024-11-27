class Coin extends DrawableObject {
  world;
  width = 120;
  height = 120;
  coin = new Audio ('assets/audio/coin.mp3');
  offset = {
    top: 40,
    left: 40,
    right: 40,
    bottom: 40
};

  constructor() {
    super();
    this.loadImage('assets/img/8_coin/coin_1.png');
    this.x = 200 + Math.random() * 2000; 
    this.y = 100 + Math.random() * 160;
  }
}
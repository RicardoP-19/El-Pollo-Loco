class CoinBar extends DrawableObject {
  percentage = 0;

  IMAGES = [
    'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
    'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
    'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
    'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
    'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
    'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
  ];


  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 55;
    this.y = 40;
    this.width = 170;
    this.height = 55;
    this.setPercentage(0);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];    
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80){
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
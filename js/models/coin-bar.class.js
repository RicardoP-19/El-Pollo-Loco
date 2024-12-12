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

  /**
  * Sets the coin percentage and updates the displayed image accordingly.
  * @param {number} percentage - The percentage of the coin bar to be displayed (from 0 to 100).
  */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];    
  }

  /**
  * Resolves the image index based on the current coin percentage.
  * @returns {number} The index of the image corresponding to the percentage.
  */
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
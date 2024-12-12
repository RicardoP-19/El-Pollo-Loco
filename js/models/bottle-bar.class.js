class BottleBar extends DrawableObject {
  percentage = 0;

  IMAGES = [
    'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 55;
    this.y = 85;
    this.width = 170;
    this.height = 50;
    this.setPercentage(0);
  }

  /**
   * Sets the percentage of the bottle and updates the image displayed based on the percentage.
   * @param {number} percentage - The percentage value to set for the bottle.
   * Must be a value between 0 and 100.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];    
  }

  /**
   * Resolves the index of the image array based on the current percentage.
   * Determines which image to display based on the bottle's percentage.
   * @returns {number} The index of the image in the IMAGES array.
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
class StatusBar extends DrawableObject {
  percentage = 100;

  IMAGES = [
    'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
    'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
    'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
    'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 55;
    this.y = 0;
    this.width = 170;
    this.height = 50;
    this.setPercentage(100);
  }

  /**
  * @description Sets the percentage of the status bar and updates the image accordingly.
  * @param {number} percentage - The new percentage value to set for the status bar.
  */
 setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];    
  }

  /**
  * @description Resolves the image index based on the current percentage and returns the appropriate image index.
  * @returns {number} The index of the image based on the current percentage.
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
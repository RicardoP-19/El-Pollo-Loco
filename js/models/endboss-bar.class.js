class EndbossBar extends DrawableObject {
  percentage = 100;

  IMAGES = [
    'assets/img/7_statusbars/2_statusbar_endboss/blue/0.png',
    'assets/img/7_statusbars/2_statusbar_endboss/blue/20.png',
    'assets/img/7_statusbars/2_statusbar_endboss/blue/40.png',
    'assets/img/7_statusbars/2_statusbar_endboss/blue/60.png',
    'assets/img/7_statusbars/2_statusbar_endboss/blue/80.png',
    'assets/img/7_statusbars/2_statusbar_endboss/blue/100.png'
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 490;
    this.y = 8;
    this.width = 170;
    this.height = 55;
    this.setPercentage(100);
  }

  /**
  * Sets the percentage value of the Endboss' status and updates the displayed image based on it.
  * @param {number} percentage - The percentage of the Endboss' health, ranging from 0 to 100.
  */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];    
  }

  /**
  * Resolves the appropriate image index based on the current percentage to display the corresponding status bar image.
  * @returns {number} The index of the image in the `IMAGES` array that corresponds to the current percentage.
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
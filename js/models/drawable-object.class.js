class DrawableObject {
  x = 120;
  y= 250;
  img;
  width = 150;
  height = 100;
  imageCache = {};
  currentImage = 0;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };

  /**
 * Draws the object image on the given canvas context at the object's position with its dimensions.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context where the object will be drawn.
 */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
  * Draws a frame around the object (used for debugging or visualizing object boundaries).
  * Only draws frames for certain object types like Character, Chicken, Endboss, etc.
  * @param {CanvasRenderingContext2D} ctx - The canvas rendering context where the frame will be drawn.
  */
  drawFrame(ctx){
    if (this instanceof Character || this instanceof Chicken || this instanceof Endboss ||this instanceof SmallChicken || this instanceof ThrowableObject|| this instanceof Coin|| this instanceof Bottle) {
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom
      );
    }
  }
  
  /**
  * Loads an image from the specified path and assigns it to the object's `img` property.
  * @param {string} path - The path to the image to be loaded.
  */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images from an array of paths and caches them in the `imageCache` property.
   * @param {string[]} array - An array of image paths to be loaded.
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
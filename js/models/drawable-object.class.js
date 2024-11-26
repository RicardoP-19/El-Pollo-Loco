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

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx){
    if (this instanceof Character || this instanceof Chicken || this instanceof Endboss ||this instanceof SmallChicken || this instanceof ThrowableObject|| this instanceof Coin|| this instanceof Bottle) {
      // ctx.beginPath();
      // ctx.lineWidth = '3';
      // ctx.strokeStyle = 'blue';
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom
      );
      // ctx.stroke();
    }
  }
  
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
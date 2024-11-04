class MovableObject {
  x = 120;
  y= 250;
  img;
  width = 150;
  height = 100;
  imageCache = {};
  currentImage = 0;
  speed = 0.17;

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

  moveRight() {

  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
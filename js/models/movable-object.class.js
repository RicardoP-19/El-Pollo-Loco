class MovableObject extends DrawableObject{
  speed = 0.17;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if(this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration; 
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if(this instanceof ThrowableObject) {
      return this.y < 330;
    } else {
      return this.y < 155;
    }
  }
  
  isColliding (mo) {
    const offset = 30;
    return (this.x + offset + this.width - 2 * offset) > mo.x &&
           (this.y + offset + this.height - 2 * offset) > mo.y &&
           (this.x + offset) < (mo.x + mo.width) &&
           (this.y + offset) < (mo.y + mo.height);        
  }


  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }
 
  isHurt(){
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
  }

  jump() {
    this.speedY = 25;
  }

  soundPause(sound) {
    sound.pause();
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++; 
  }

  stopAnimation(interval) {
    setTimeout(() => {
      clearInterval(interval);
    }, 2000)
  }

  remove() {
    if (this.world && this.world.ThrowableObject) {
      const index = this.world.ThrowableObject.indexOf(this);
      if (index > -1) {
        this.world.ThrowableObject.splice(index, 1);
      }
    }
  }
}
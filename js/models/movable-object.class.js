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
  
  isColliding (obj) {
    return  (this.x + this.width - this.offset.right) >= (obj.x + obj.offset.left) &&
        (this.x + this.offset.left) <= (obj.x + obj.width - obj.offset.right) &&
        (this.y + this.height - this.offset.bottom) >=(obj.y + obj.offset.top)  &&
        (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom)
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

  playSound(sound) {
    if (sound == 'walking') {
      this.walking.play();
    } else if (sound == 'jump') {
      this.jumping.play();
    } else if (sound == 'alert') {
      this.alert_sound.play();
    } else if (sound == 'endboss') {
      this.enboss_sound.play();
    }
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
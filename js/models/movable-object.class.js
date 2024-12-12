class MovableObject extends DrawableObject{
  speed = 0.17;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  /**
  * Applies gravity to the object, adjusting its vertical position and speed.
  * This function ensures the object moves in a realistic way under the influence of gravity.
  * Runs at a fixed interval to update the object's vertical position.
  */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else if (this.speedY !== 0) {
        setTimeout(() => {this.speedY = 0;}, 30);
      }
    }, 1000 / 25);
  }

  /**
  * Checks if the object is above the ground based on its current position.
  * The threshold for ground detection is different for throwable objects.
  * 
  * @returns {boolean} - Returns true if the object is above the ground, otherwise false.
  */
  isAboveGround() {
    if(this instanceof ThrowableObject) {
      return this.y < 330;
    } else {
      return this.y < 160;
    }
  }
  
  /**
  * Checks if this object is colliding with another object.
  * Uses the bounding box method to check if the rectangles overlap.
  * 
  * @param {Object} obj - The object to check collision with.
  * @returns {boolean} - Returns true if there is a collision, otherwise false.
  */
  isColliding (obj) {
    return  (this.x + this.width - this.offset.right) >= (obj.x + obj.offset.left) &&
            (this.x + this.offset.left) <= (obj.x + obj.width - obj.offset.right) &&
            (this.y + this.height - this.offset.bottom) >=(obj.y + obj.offset.top)  &&
            (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom)
  }

  /**
  * Reduces the object's energy by 5 points when it is hit.
  * If the energy drops below 0, it is set to 0.
  */
  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }
 
  /**
  * Determines if the object is hurt based on the time passed since the last hit.
  * 
  * @returns {boolean} - Returns true if the object was hit in the last second.
  */
  isHurt(){
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
  * Checks if the object is dead (energy is 0).
  * 
  * @returns {boolean} - Returns true if the object is dead, otherwise false.
  */
  isDead() {
    return this.energy == 0;
  }

  /**
  * Moves the object to the right by the object's speed.
  * Sets the `otherDirection` flag to false to indicate the movement direction.
  */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  /**
  * Moves the object to the left by the object's speed.
  * Sets the `otherDirection` flag to true to indicate the movement direction.
  */
  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
  }

  /**
  * Makes the object jump by applying an upward speed.
  * The object will be considered as jumping once this method is called.
  */
  jump() {
    this.speedY = 25;
    this.isJumping = true;
  }

  /**
  * Plays the animation based on the provided array of image paths.
  * The animation loops through the images at a fixed interval.
  * 
  * @param {string[]} images - The array of image paths to play for the animation.
  */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++; 
  }

  /**
  * Stops the animation after a certain amount of time.
  * This method clears the interval for the animation after 2 seconds.
  * 
  * @param {number} interval - The interval ID to clear.
  */
  stopAnimation(interval) {
    setTimeout(() => {
      clearInterval(interval);
    }, 2000)
  }

  /**
  * Removes the object from the world (specifically from the throwable objects array).
  * This method updates the world state to reflect the removal of the object.
  */
  remove() {
    if (this.world && this.world.ThrowableObject) {
      const index = this.world.ThrowableObject.indexOf(this);
      if (index > -1) {
        this.world.ThrowableObject.splice(index, 1);
      }
    }
  }
}
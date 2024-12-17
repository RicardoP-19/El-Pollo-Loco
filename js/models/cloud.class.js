class Cloud extends MovableObject {
  world;
  x = 0;
  y = 15;
  width = 400;
  height = 200;
  
  constructor() {
    super().loadImage('assets/img/5_background/layers/4_clouds/1.png');
    this.x = Math.random() * 2200;
    this.animate();
  }

  /**
   * Starts the animation and movement for the cloud.
   * The cloud moves left across the screen at a constant speed.
   */
  animate() {
    let animationCloud = setInterval(() => {    
      if (this.world) {
        this.cloudsMoveLeft();
      }
      clearInterval(animationCloud);
    }, 500);
  }

  cloudsMoveLeft() {
    let cloudInterval = setInterval(() => {
      if (this.world) {
        this.moveLeft();
      }
    }, 20);
    world.pushIntervall(cloudInterval);
  }
}
class SmallChicken extends MovableObject{
  y = 380;
  width = 35;
  height = 40;
  isDead = false;
  // smallChicken = new Audio('assets/audio/small_chicken.mp3');
  offset = {
    top: -15,
    left: -5,
    right: -5,
    bottom: 0
  };
  
  IMAGES_WALKING = [
    'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
  ];

  IMAGES_DEAD = ['assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'];
  
  constructor() {
    super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
    this.loadImages(this.IMAGES_WALKING);
    this.loadImage(this.IMAGES_DEAD);
    this.x = 500 + Math.random() * 2000;
    this.speed = 0.15 + Math.random() * 0.27;
    this.animate();
  }

  /**
  * Creates an instance of SmallChicken, initializes its properties and starts its animation.
  * Loads walking images, dead images, and sets a random starting position and speed.
  */
  animate() {
    let smallChickInterval = setInterval(() => {
      if (!this.isDead && gameStarted) {
        this.moveLeft();
        this.otherDirection = false;
      }
      world.pushIntervall(smallChickInterval);
    }, 1000 / 60);

    let smallChickenAnimteInterval = setInterval(() => {
      if (!this.isDead && gameStarted) {
        this.playAnimation(this.IMAGES_WALKING);
      }
      world.pushIntervall(smallChickenAnimteInterval);
    }, 170);
  }
}
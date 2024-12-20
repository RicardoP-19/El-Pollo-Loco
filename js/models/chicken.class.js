class Chicken extends MovableObject{
  y = 369;
  width = 70;
  height = 50;
  world;
  isDead = false;
  chicken_sound = new Audio('assets/audio/chicken.mp3');
  offset = {
    top: -15,
    left: 0,
    right: 0,
    bottom: 0
  };
  
  IMAGES_WALKING = [
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
  ];

  IMAGE_DEAD = ['assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];
  
  constructor() {
    super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
    this.loadImages(this.IMAGES_WALKING);
    this.x = 500 + Math.random() * 2000;
    this.speed = 0.17 + Math.random() * 0.27;
    this.animate();
  }

  /**
  * Starts the animation and movement for the chicken.
  * The chicken moves left across the screen at a random speed. The animation for walking is also handled in intervals.
  */
  animate() {
    let animationChicken = setInterval(() => {    
      if (this.world) {
        this.chickenMoveLeft();
        this.chickenAnimation();
      }
      clearInterval(animationChicken);  
    }, 500);
  }

  chickenMoveLeft() {
    let chickInterval = setInterval(() => {      
      if (!this.isDead && gameStarted) {
        this.moveLeft();
        this.otherDirection = false;
      } 
    }, 1000 / 60);    
    world.pushIntervall(chickInterval);
  }

  chickenAnimation() {
    let chickAnimationInterval = setInterval(() => {
      if (!this.isDead && gameStarted) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 170);    
    world.pushIntervall(chickAnimationInterval);
  }
}
class Chicken extends MovableObject{
  y = 369;
  width = 70;
  height = 50;
  isDead = false;
  chicken_sound = new Audio('assets/audio/chicken.mp3');
  
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

  animate() {
    let chickInterval = setInterval(() => {
      if (!this.isDead && gameStarted) {
        this.moveLeft();
        this.otherDirection = false;
      }
      world.pushIntervall(chickInterval);
    }, 1000 / 60);
    let chickAnimationInterval = setInterval(() => {
      if (!this.isDead && gameStarted) {
        this.playAnimation(this.IMAGES_WALKING);
      }
      world.pushIntervall(chickAnimationInterval);
    }, 170);
  }
}
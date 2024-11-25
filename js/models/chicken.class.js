class Chicken extends MovableObject{
  y = 369;
  width = 70;
  height = 60;
  isDead = false;
  
  IMAGES_WALKING = [
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
  ];

  IMAGE_DEAD = ['assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];
  
  constructor() {
    super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
    this.loadImages(this.IMAGES_WALKING);
    this.x = 200 + Math.random() * 2000;
    this.speed = 0.17 + Math.random() * 0.27;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
        this.otherDirection = false;
      }
    }, 1000 / 60);

    setInterval(() => {
    if (!this.isDead) {
      this.playAnimation(this.IMAGES_WALKING);
    }
    }, 170);
  }
}
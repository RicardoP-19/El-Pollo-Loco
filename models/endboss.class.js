class Endboss extends MovableObject {
  width = 270;
  height = 470;
  x = 2500;
  y = -5;

  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0])
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 170);
  }
}
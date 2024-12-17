class ThrowableObject extends MovableObject {
  world;
  bottleSplash = new Audio('assets/audio/bottle.mp3');
  collect_bottle = new Audio('assets/audio/collect_bottle.mp3');

  IMAGES_ROTATION = [
    'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
  ];

  IMAGES_SPLASH = [
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
  ];

  constructor(x, y, world) {
    super().loadImage('assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.applyGravity();
    this.speedY = 25;
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 80;
    this.world = world;
    this.animate();
  }

  animate() {
    if (this.world) {
      this.throw();
    }
  }

  /**
  * @description Initiates the throwing action, applying gravity to the object and making it fall after reaching a certain height.
  */
  throw() {
    let throwInterval = setInterval(() => {
      if (this.isAboveGround()) {
        this.bottleThrowing();
      } else {
        this.bottleSplashFloor(throwInterval);
      }
    }, 30);
  }

  /**
  * @description Handles the bottle throwing animation and movement.
  */
  bottleThrowing() {
    this.x += 10;
    this.playAnimation(this.IMAGES_ROTATION);
  }

  /**
  * @description Handles the bottle splash animation and the interaction when the bottle hits the ground.
  * @param {number} interval - The interval ID used to clear the throwing animation when the bottle hits the ground.
  */
  bottleSplashFloor(throwInterval) {
    this.bottleSplash.play();
    this.playAnimation(this.IMAGES_SPLASH);
    setTimeout(() => this.remove(), 150);
    clearInterval(throwInterval);
  }
}
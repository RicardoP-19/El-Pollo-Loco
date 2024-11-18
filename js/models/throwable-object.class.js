class ThrowableObject extends MovableObject {
  world;
  bottleSplash = new Audio('assets/audio/bottle.mp3');

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
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 80;
    this.world = world;
    this.throw()
  }

  throw() {
    this.soundPause(this.bottleSplash);
    this.speedY = 25;
    this.applyGravity();
    let interval = setInterval(() => {
      if (this.isAboveGround()) {
        this.bottleThrowing();
      } else {
        this.bottleSplashFloor(interval);
      }
    }, 30);
  }

  bottleThrowing() {
    this.x += 10;
    this.playAnimation(this.IMAGES_ROTATION);
  }

  bottleSplashFloor(interval) {
    this.playBottleSplash();
    setInterval(() => {this.playAnimation(this.IMAGES_SPLASH)}, 1000/ 60)
    clearInterval(interval);
    setTimeout(() => this.remove(), 150);
  }

  playBottleSplash() {
    this.bottleSplash.play();
  }
}
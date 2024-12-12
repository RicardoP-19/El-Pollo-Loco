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
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 80;
    this.world = world;
    this.bottleThrowingDirection();
    this.throw()
  }

  /**
  * @description Initiates the throwing action, applying gravity to the object and making it fall after reaching a certain height.
  */
  throw() {
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

  /**
  * @description Handles the bottle throwing animation and movement.
  */
  bottleThrowing() {
   if (this.world.character.otherDirection) {
       this.x -= 10;
   } else {
       this.x += 10;
   }
   this.playAnimation(this.IMAGES_ROTATION);
  }

  /**
  * @description Sets the initial direction of the bottle based on the character's orientation.
  */
  bottleThrowingDirection() {
    if (!this.world || !this.world.character) {
      return;
    } if (this.world.character.otherDirection) {
      this.x = this.world.character.x - 20 ;
    } else {
      this.x = this.world.character.x + this.world.character.width - 50;
    }
    this.y = this.world.character.y + 80;
  }

  /**
  * @description Handles the bottle splash animation and the interaction when the bottle hits the ground.
  * @param {number} interval - The interval ID used to clear the throwing animation when the bottle hits the ground.
  */
  bottleSplashFloor(interval) {
    clearInterval(interval);
    if (world.soundEnabled) {
      this.bottleSplash.play();
    }
    this.playAnimation(this.IMAGES_SPLASH);
    setTimeout(() => this.remove(), 150);
  }
}
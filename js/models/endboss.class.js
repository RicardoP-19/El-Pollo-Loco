class Endboss extends MovableObject {
  width = 270;
  height = 470;
  x = 2500;
  y = -5;
  isMoving = false;
  alerted = false;
  dead = false;
  alert_sound = new Audio('assets/audio/endboss.mp3');
  enboss_sound = new Audio('assets/audio/endboss_music.mp3')

  IMAGES_WALKING = [
    'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
    'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
    'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
    'assets/img/4_enemie_boss_chicken/1_walk/G4.png'
  ];

  IMAGES_ALERT = [
    'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
    'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
    'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
    'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
    'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
    'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
    'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
    'assets/img/4_enemie_boss_chicken/2_alert/G12.png'
  ];

  IMAGES_ATTACK = [
    'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
    'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
    'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
    'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
    'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
    'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
    'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
    'assets/img/4_enemie_boss_chicken/3_attack/G20.png'
  ];

  IMAGES_HURT = [
    'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
    'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
    'assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
  ];

  IMAGES_DEAD = [
    'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
    'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
    'assets/img/4_enemie_boss_chicken/5_dead/G26.png'
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[1])
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.speed = 7;
    this.checkHurt();
    this.checkDead();
  }

  checkHurt() {
    let hurtInterval = setInterval(() => {
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        world.pushIntervall(hurtInterval);    
      } 
    }, 60);
  }

  checkDead() {
    let deadInterval = setInterval(() => {
      if (this.isDead()) {
        this.gameEnded(deadInterval)
      }
    }, 60);
  }

  gameEnded(deadInterval) {
    this.dead = true;
    world.pushIntervall(deadInterval);
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => {
      this.loadImage(this.IMAGES_DEAD[2]);   
      world.stopGame();
    }, this.IMAGES_DEAD.length * 60);
  }

  startAlertAnimation() {
    if (!this.isMoving && !this.alerted) {
      this.setAlertAndMoving();
      this.playAlertSound();
      this.playAndStopAnimation();
      setTimeout(() => this.startAttackAnimation(), 3000);
    }
  }

  setAlertAndMoving() {
    this.alerted = true;
    this.isMoving = true;
  }

  playAlertSound() {
    this.playSound('alert');
  } 

  playAndStopAnimation() {
    let alertInterval = setInterval(() => {this.playAnimation(this.IMAGES_ALERT)}, 200);
    this.stopAnimation(alertInterval);
    world.pushIntervall(alertInterval);
  }

  startAttackAnimation() {
      this.playSound('endboss');
      this.isMoving = true;
      this.startMoving();
      this.movingAnimation();
      setTimeout(() => {
        this.startAttack();
      }, 3000);
  }

  startMoving() {
    let movingInterval = setInterval(() => {
      if (this.isMoving) {
        this.moveLeft();
        this.otherDirection = false;
        world.pushIntervall(movingInterval);
      }
    }, 1000 / 10);
  }

  movingAnimation() {
    let moveAnimationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING); 
      world.pushIntervall(moveAnimationInterval);
    }, 300);
    setTimeout(() => this.stopAnimation(moveAnimationInterval), 3000);
  }

  startAttack() {
    if (!this.dead) {
      this.isMoving = false;
      let startInterval = setInterval(() => {
        this.playSound('alert');
        this.playAnimation(this.IMAGES_ATTACK);        
        world.pushIntervall(startInterval);
      }, 400);
      this.stopAnimation(startInterval);
      setTimeout(() => this.startAttackAnimation(), 2000);
    }
  } 
}
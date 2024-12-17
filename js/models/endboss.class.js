class Endboss extends MovableObject {
  world;
  width = 270;
  height = 470;
  x = 2500;
  y = -5;
  isMoving = false;
  alerted = false;
  dead = false;
  alert_sound = new Audio('assets/audio/endboss.mp3');
  enboss_sound = new Audio('assets/audio/endboss_music.mp3')
  offset = {
    top: 0,
    left: 60,
    right: 50,
    bottom: 0
  };

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
    this.speed = 8;
  }

  /**
  * Starts the alert sequence for the Endboss, which triggers an alert animation and sound,
  * and then starts the moving sequence after a brief delay.
  */
  startEndboss() {
    if (!this.isMoving && !this.alerted && !this.gameEnd) {
      this.setAlertAndMoving();
      world.playSound('alert');
      this.playAndStopAnimation();
      this.checkHurt();
      this.checkDead();
      setTimeout(() => this.startMoving(), 2000);
    }
  }

  /**
  * Sets the Endboss to alerted and moving states.
  * This function is called when the Endboss starts its alert phase.
  */
  setAlertAndMoving() {
    this.alerted = true;
    this.isMoving = true;
  }

  /**
  * Plays and stops the alert animation for the Endboss at a set interval.
  */
  playAndStopAnimation() {
    let alertInterval = setInterval(() => {this.playAnimation(this.IMAGES_ALERT)}, 200);
    setTimeout(() => {clearInterval(alertInterval)}, 2000);
    world.pushIntervall(alertInterval);
  }

  /**
  * Starts the Endboss' movement phase, including playing movement sounds, 
  * triggering walking animation, and starting an attack phase after a delay.
  */
  startMoving() {
    if (!this.dead && !this.world.gameEnd) {
      this.playEndbossSound();
      this.Moving();
      this.movingAnimation();
      setTimeout(() => {this.startAttack()}, 3000); 
    }
  }

  playEndbossSound() {
    if (world.soundEnabled) {
      this.world.backgroundMusic.pause();
      world.playSound('endboss');      
    }
  }

  /**
  * Moves the Endboss left at a constant speed, running at regular intervals.
  */
  Moving() {
    this.isMoving = true;
    let movingInterval = setInterval(() => {      
      if (this.isMoving) {
        this.moveLeft();
        this.otherDirection = false;
      }
    }, 100);
    world.pushIntervall(movingInterval);
  }

  /**
  * Plays the walking animation for the Endboss at a set interval.
  * The animation runs for a short duration during the movement phase.
  */
  movingAnimation() {
    let moveAnimationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING); 
    }, 200);
    setTimeout(() => {clearInterval(moveAnimationInterval)}, 3000);
    world.pushIntervall(moveAnimationInterval);
  }

  /**
  * Starts the Endboss' attack phase, including playing the attack animation
  * and stopping the movement before returning to movement after a delay.
  */
  startAttack() {
    if (!this.dead) {
      this.isMoving = false;
      world.playSound('alert');
      this.attackAnimation();
      setTimeout(() => this.startMoving(), 2000);
    }
  }

  /**
  * Plays the attack animation for the Endboss at regular intervals during the attack phase.
  */
  attackAnimation() {
   let attackInterval = setInterval(() => {
     this.playAnimation(this.IMAGES_ATTACK);        
   }, 200);
   setTimeout(() => {clearInterval(attackInterval)}, 2000);
   world.pushIntervall(attackInterval);
  }

  /**
  * Checks if the Endboss is hurt and plays the hurt animation.
  * This function runs continuously at a set interval.
  */
  checkHurt() {
    let hurtInterval = setInterval(() => {
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);   
      } 
    }, 60);
    world.pushIntervall(hurtInterval);  
  }
  
  /**
  * Checks if the Endboss is dead and triggers the end game if true.
  * This function runs continuously at a set interval.
  */
  checkDead() {
    let deadInterval = setInterval(() => {
      if (this.isDead()) {
        this.gameEnded();      
      }
    }, 60);
    world.pushIntervall(deadInterval);
  }

  /**
  * Handles the game over sequence when the Endboss dies, including playing the dead animation 
  * and stopping the background music, followed by a win screen.
  */
  gameEnded() {
    this.dead = true;
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => {
      this.loadImage(this.IMAGES_DEAD[2]);
      world.stopGame('win');
    }, this.IMAGES_DEAD.length * 60);
  }
}
class Character extends MovableObject {
  y = 165;
  height = 260;
  speed = 7;
  world;
  hurt = new Audio('assets/audio/hurt.mp3');
  jumping = new Audio('assets/audio/jump.mp3');
  idleTime = 0;
  offset = {
    top: 100,
    left: 40,
    right: 30,
    bottom: 0
  };

  IMAGES_JUMPING = [
    'assets/img/2_character_pepe/3_jump/J-31.png',
    'assets/img/2_character_pepe/3_jump/J-32.png',
    'assets/img/2_character_pepe/3_jump/J-33.png',
    'assets/img/2_character_pepe/3_jump/J-34.png',
    'assets/img/2_character_pepe/3_jump/J-35.png',
    'assets/img/2_character_pepe/3_jump/J-36.png',
    'assets/img/2_character_pepe/3_jump/J-37.png',
    'assets/img/2_character_pepe/3_jump/J-38.png',
    'assets/img/2_character_pepe/3_jump/J-39.png',
  ];
    
  IMAGES_WALKING = [
    'assets/img/2_character_pepe/2_walk/W-21.png',
    'assets/img/2_character_pepe/2_walk/W-22.png',
    'assets/img/2_character_pepe/2_walk/W-23.png',
    'assets/img/2_character_pepe/2_walk/W-24.png',
    'assets/img/2_character_pepe/2_walk/W-25.png',
    'assets/img/2_character_pepe/2_walk/W-26.png',
  ];

  IMAGES_HURT = [
    'assets/img/2_character_pepe/4_hurt/H-41.png',
    'assets/img/2_character_pepe/4_hurt/H-42.png',
    'assets/img/2_character_pepe/4_hurt/H-43.png'
  ];

  IMAGES_DEAD = [
    'assets/img/2_character_pepe/5_dead/D-51.png',
    'assets/img/2_character_pepe/5_dead/D-52.png',
    'assets/img/2_character_pepe/5_dead/D-53.png',
    'assets/img/2_character_pepe/5_dead/D-54.png',
    'assets/img/2_character_pepe/5_dead/D-55.png',
    'assets/img/2_character_pepe/5_dead/D-56.png'
  ];

  IMAGES_IDLE = [
    'assets/img/2_character_pepe/1_idle/idle/I-1.png',
    'assets/img/2_character_pepe/1_idle/idle/I-2.png',
    'assets/img/2_character_pepe/1_idle/idle/I-3.png',
    'assets/img/2_character_pepe/1_idle/idle/I-4.png',
    'assets/img/2_character_pepe/1_idle/idle/I-5.png',
    'assets/img/2_character_pepe/1_idle/idle/I-6.png',
    'assets/img/2_character_pepe/1_idle/idle/I-7.png',
    'assets/img/2_character_pepe/1_idle/idle/I-8.png',
    'assets/img/2_character_pepe/1_idle/idle/I-9.png',
    'assets/img/2_character_pepe/1_idle/idle/I-10.png'  
  ];

  IMAGES_LONG_IDLE = [
    'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
    'assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
  ];

  constructor() {
    super().loadImage('assets/img/2_character_pepe/1_idle/idle/I-1.png');
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.applyGravity();
    this.animate();
  }

  /**
  * Starts the animation and updates the character's state by setting idle, movement, and action animations.
  * This function controls how the character behaves while idle, moving, or performing actions like jumping or being hurt.
  */
  animate() {
    let animationStarted = setInterval(() => {
      if (this.world) {
        this.setIdleState();
        this.movingCharacter();
        this.movingCharacterAnimation(); 
      }
      clearInterval(animationStarted);
    }, 500);
  }

  /**
  * Handles the idle state of the character.
  * The character remains idle until it starts moving or jumping. After 5 seconds, it switches to a long idle animation.
  * The function runs at intervals to check and update the character's idle state.
  */
  setIdleState() {
    let idleInterval = setInterval(() => {
      if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isAboveGround()) {
        if (this.idleTime < 5000) {         
          this.playAnimation(this.IMAGES_IDLE);
          this.idleTime += 200;
        } if (this.idleTime == 5000) {
          this.playAnimation(this.IMAGES_LONG_IDLE)
        }
      } else {
        this.idleTime = 0;
      }
    }, 300);
    world.pushIntervall(idleInterval);
  }
  
  /**
  * Handles the movement of the character when pressing arrow keys or space.
  * The character moves left or right when the corresponding arrow keys are pressed, and jumps when the space bar or up arrow is pressed.
  * The camera follows the character's movement.
  */
  movingCharacter() {
    let characterMove = setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
      } if (this.world.keyboard.LEFT &&  this.x > 0) {
        this.moveLeft();
      } if ((this.world.keyboard.UP || keyboard.SPACE) && !this.isAboveGround()) {
        this.jump();
        world.playSound('jump');
      }
      this.world.camera_x = -this.x + 70;
    }, 1000 / 60);
    world.pushIntervall(characterMove);
  }

  /**
  * Updates the character's animation based on its state (jumping, walking, hurt, dead).
  * The function ensures that the correct animation is played depending on whether the character is in the air, walking, hurt, or dead.
  */
  movingCharacterAnimation() {
    let characterInterval = setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        world.playSound('hurt');
      } else if (this.isDead()) {
        this.gameOver();
      }
    }, 60);
    world.pushIntervall(characterInterval);
  }

  /**
   * Executes when the character is dead. It plays the dead animation and stops the character's movement.
   * After a short delay, the game will be marked as lost.
   * @param {Interval} characterInterval - The interval ID for the character's animation loop, used to stop the animation when the character is dead.
   */
  gameOver() {
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => {this.world.stopGame('lose')}, 1000);
  }
}
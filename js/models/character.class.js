class Character extends MovableObject {
  y = 165;
  height = 270;
  speed = 7;
  world;
  walking = new Audio('assets/audio/run.mp3');
  jumping = new Audio('assets/audio/jump.mp3');

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

  constructor() {
    super().loadImage('assets/img/2_character_pepe/1_idle/idle/I-1.png');
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.applyGravity();
    this.animate();
  }

  animate() {
    this.movingCharacter();
    this.movingCharacterAnimation();
  }

  movingCharacter() {
    let characterMove = setInterval(() => {
      this.soundPause(this.walking);
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.playSound('walking')
      } if (this.world.keyboard.LEFT &&  this.x > 0) {
        this.moveLeft();
        this.playSound('walking')
      } if ((this.world.keyboard.UP || keyboard.SPACE) && !this.isAboveGround()) {
        this.jump();
        this.playSound('jump');
      }
      this.world.camera_x = -this.x + 70;
      this.world.intervalIds.push(characterMove);
    }, 1000 / 60);
  }

  movingCharacterAnimation() {
    let characterInterval = setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        this.stopAnimation(characterInterval);
        setTimeout(() => {world.stopGame();}, 1000);
      }
      world.pushIntervall(characterInterval);
      // world.intervalIds.push(characterInterval);
    }, 60);
  }

  playSound(sound) {
    if (sound == 'walking') {
      this.walking.play();
    } if (sound == 'jump') {
      this.jumping.play();
    }
  }
}
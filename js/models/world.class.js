class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  endbossBar = new EndbossBar();
  showEndbossBar = false;
  bottle = new ThrowableObject(); 
  ThrowableObject = [];
  intervalIds = [];
  collectedBottles = 0;
  soundEnabled = false;
  backgroundMusic;
  gameEnd = false;


  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.checkCollisions();
    this.gameMusic();
  }

  /**
  * @description Sets the world for all the objects (character, clouds, coins, bottles, etc.) in the game.
  */
  setWorld() {
    this.character.world = this;
    this.level.clouds.forEach(cloud => cloud.world = this);
    this.level.coins.forEach(coin => coin.world = this);
    this.level.bottles.forEach(bottle => bottle.world = this);
  }

  /**
  * @description Starts the game loop and periodically checks collisions and other game interactions.
  */
  run() {
    let runInterval = setInterval(() => {
      this.checkThrowObjects();
      this.checkEndbossBar();
      this.pushIntervall(runInterval);
    }, 200)
  }

  /**
  * @description Checks collisions between the character and other objects like enemies, coins, bottles, etc.
  */
  checkCollisions() {
    let collisionInterval = setInterval(() => {
      this.characterAndChicken();
      this.collisionsBottle();
      this.characterAndCoins();
      this.characterAndBottles();
      this.characterAndEndboss();
      this.pushIntervall(collisionInterval);
    }, 30);
  }

  /**
  * @description Handles collisions between the character and chickens (enemies).
  */
  characterAndChicken() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (!this.isCharacterJumpingOnEnemy(enemy)) {
          this.normalCollision();
        } if (this.isCharacterJumpingOnEnemy(enemy)) {
          this.jumpCollision(enemy);
        }
      }
    });
  }

  /**
  * @description Checks if the character is jumping on an enemy (e.g., chicken).
  * @param {Object} enemy - The enemy object to check against.
  * @returns {boolean} True if the character is jumping on the enemy, otherwise false.
  */
  isCharacterJumpingOnEnemy(enemy) {
    const characterBottom = this.character.y + this.character.height;
    const enemyTop = enemy.y - enemy.height;
    const isFalling = this.character.speedY < 0;
    return  isFalling && characterBottom >= enemyTop -40 && 
            this.character.x + this.character.width > enemy.x &&
            this.character.x < enemy.x + enemy.width;
  }

  /**
  * @description Handles the collision when the character jumps on an enemy.
  * @param {Object} enemy - The enemy that the character is colliding with.
  */
  jumpCollision(enemy) {
    enemy.isDead = true;
    enemy.speed = 0;
    if (enemy instanceof SmallChicken) {
      enemy.loadImage(enemy.IMAGES_DEAD[0]);
      this.playSound('smallChicken');
    } else if (enemy instanceof Chicken) {
      enemy.loadImage(enemy.IMAGE_DEAD[0]);
      this.playSound('chicken');
    }
    setTimeout(() => {this.level.enemies = this.level.enemies.filter(element => element !== enemy)}, 30);  
  }

  /**
  * @description Handles the normal collision between the character and an enemy.
  */
  normalCollision() {    
    this.character.hit();
    this.statusBar.setPercentage(this.character.energy);
  }

  /**
  * @description Checks collisions between throwable objects (e.g., bottles) and other objects.
  */
  collisionsBottle() {
    this.ThrowableObject.forEach((bottle) => { 
      let bottelInterval = setInterval(() => {
        if (this.level.endboss[0].isColliding(bottle)) {
          bottle.bottleSplashFloor(interval);
          this.level.endboss[0].hit();
          this.endbossBar.setPercentage(this.level.endboss[0].energy);
        }
        this.pushIntervall(bottelInterval);
      }, 1000 / 150)
    })
  }

  /**
  * @description Handles the collision between the character and coins.
  */
  characterAndCoins() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin) && this.coinBar.percentage < 100) {
      this.playSound('coin');
      this.level.coins.splice(index, 1);
      this.coinBar.setPercentage(this.coinBar.percentage + 10);         
      }
    });
  }

  /**
  * @description Handles the collision between the character and bottles.
  */
  characterAndBottles() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle) && this.bottleBar.percentage < 100) {
      this.playSound('bottle');
      this.level.bottles.splice(index, 1);      
      this.bottleBar.setPercentage(this.bottleBar.percentage + 10);
      this.collectedBottles++;             
      }
    });
  }

  /**
  * @description Handles the collision between the character and the endboss.
  */
  characterAndEndboss() {
    let endboss = this.level.endboss[0];
    if (this.character.isColliding(endboss)) {
      this.character.hit();
      this.statusBar.setPercentage(this.character.energy);
    }
  }

  /**
  * @description Checks if the player has thrown a bottle and handles the action.
  */
  checkThrowObjects() {
    if(this.keyboard.D && this.collectedBottles > 0) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this);
      this.ThrowableObject.push(bottle);
      this.collectedBottles--;
      this.bottleBar.setPercentage(this.bottleBar.percentage - 10);
    }
  }

  /**
  * @description Checks the status of the endboss bar and triggers actions if the player approaches the endboss.
  */
  checkEndbossBar() {
    let distance = this.endbossBar.x - this.character.x ;
    if (distance < -1600) {
      this.toggleBackgroundMusic(false);
      this.showEndbossBar = true;
      this.level.endboss[0].startAlert();
    }
  }

  /**
  * @description Clears the canvas and redraws all objects in the game world.
  */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawLevelObjects();
    this.drawCharacter();
    this.drawAllStatusBar();
    this.drawThrowableObject();
    let self = this
    requestAnimationFrame(function() {
      self.draw();
    });
  }

  /**
  * @description Draws all objects in the level (background, clouds, coins, enemies, etc.).
  */
  drawLevelObjects() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);
    this.ctx.translate(-this.camera_x, 0)
  }

  /**
  * @description Draws the character on the canvas.
  */
  drawCharacter() {
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0)
  }

  /**
  * @description Draws all status bars on the canvas (health, coins, bottles, etc.).
  */
  drawAllStatusBar() {
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    if (this.showEndbossBar) {
      this.addToMap(this.endbossBar);
    }
  }

  /**
  * @description Draws all throwable objects on the canvas.
  */
  drawThrowableObject() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.ThrowableObject);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
  * @description Adds an array of objects to the map (canvas) for rendering.
  * @param {Array} objects - The list of objects to be drawn.
  */
  addObjectsToMap(objects){
    objects.forEach(object => {
        this.addToMap(object);
    });
  }

  /**
  * @description Adds a single object to the map (canvas) for rendering.
  * @param {DrawableObject} mo - The object to be drawn.
  */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
  * @description Flips an image horizontally (used for objects facing the opposite direction).
  * @param {DrawableObject} mo - The object whose image should be flipped.
  */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1)
    mo.x = mo.x * -1;
  }

  /**
  * @description Restores the image back to its original orientation after flipping.
  * @param {DrawableObject} mo - The object whose image orientation should be restored.
  */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
  * @description Stops the game and shows the end screen with the outcome.
  * @param {string} ended - The outcome of the game, either 'win' or 'lose'.
  */
  stopGame(ended) {
    this.toggleBackgroundMusic(false);
    this.stoppAllInterval();
    this.showEndScreen(ended);
    // this.resetWorld();
  }

  /**
  * @description Displays the end screen based on the game's result ('win' or 'lose').
  * @param {string} ended - The outcome of the game.
  */
  showEndScreen(ended) {
    this.gameEnd = true;
    this.endScreenChoose(ended);
    this.endScreenTypeButtons();
  }

  /**
  * @description Sets up the buttons for the end screen based on the platform (mobile or desktop).
  * @param {string} ended - The outcome of the game.
  */
  endScreenChoose(ended) {
    document.getElementById('mobilPlayBtn').classList.add('d-none')
    document.getElementById('screenAndSound').classList.add('d-none');
    document.getElementById('endScreen').classList.remove('d-none');
    let endScreen = document.getElementById('endScreen');
    if (ended == 'win') {
      endScreen.src = 'assets/img/9_intro_outro_screens/win/win_2.png';
    } if (ended == 'lose' ) {
      endScreen.src = 'assets/img/9_intro_outro_screens/game_over/game over.png';
    }
  }

  /**
  * @description Sets the type of buttons for the end screen (mobile or desktop).
  */
  endScreenTypeButtons() {
    const screenType = getScreenType();
    if (screenType === 'mobile') {
      gameEndMobileButtons();
    } else {
      gameEndDesktopButtons();
    }
  }

  /**
  * @description Adds a new interval to the list of active intervals for later management.
  * @param {number} interval - The interval ID to be added.
  */
  pushIntervall(interval) {  
    world.intervalIds.push(interval);
    // console.log(world.intervalIds); 
  }

  /**
  * @description Stops all ongoing intervals in the game to halt any active actions.
  */
  stoppAllInterval() {
    this.intervalIds.forEach(clearInterval);
    this.intervalIds = [];
    // console.log(this.intervalIds);
    
  }

  /**
  * @description Plays a specific sound based on the provided sound name.
  * @param {string} sound - The name of the sound to play (e.g., 'hurt', 'jump', 'coin').
  */
  playSound(sound) {
    if (!this.soundEnabled) return;
    if (sound == 'hurt') {
      this.character.hurt.play();
    } else if (sound == 'jump') {
      this.character.jumping.play();
    } else if (sound == 'alert') {
      this.level.endboss[0].alert_sound.play();
    } else if (sound == 'endboss') {
      this.level.endboss[0].enboss_sound.play();
    } else if (sound == 'coin') {
      this.level.coins[0].coin.play();
    } else if (sound == 'bottle') {
      this.bottle.collect_bottle.play();
    } else if (sound == 'chicken') {
      this.playEnemySound ('chicken');
    } else if (sound == 'smallChicken') {
      this.playEnemySound ('smallChicken');
    }   
  }

  /**
  * @description Plays an enemy sound based on the provided array name (e.g., 'chicken', 'smallChicken').
  * @param {string} array - The name of the array of enemies to play sound for.
  */
  playEnemySound (array) {
    if (array == 'chicken') {
      const chickens = this.level.enemies.filter(enemy => enemy instanceof Chicken);
      if (chickens.length > 0) {
        chickens[0].chicken_sound?.play();
      } 
    } if (array == 'smallChicken') {
      const smallChickens = this.level.enemies.filter(enemy => enemy instanceof SmallChicken);
      if (smallChickens.length > 0) {
        smallChickens[0].smallChicken?.play();
      }
    }
  }

  /**
  * @description Pauses a specific sound.
  * @param {HTMLAudioElement} sound - The sound to be paused.
  */
  soundPause(sound) {
    sound.pause();
  }

  /**
  * @description Initializes and plays the background music for the game.
  */
  gameMusic() {
    this.soundEnabled = true;
    this.backgroundMusic = new Audio('assets/audio/el_pollo_loco_music.mp3');
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.2;
    this.toggleBackgroundMusic(true);
  }

  /**
  * @description Toggles the background music based on the provided state (play or pause).
  * @param {boolean} play - True to play the background music, false to pause it.
  */
  toggleBackgroundMusic(play) {
    if (this.soundEnabled && play) {
      this.backgroundMusic.play();
    } else {
      this.backgroundMusic.pause();
    }
  }

  /**
  * @description Toggles the sound in the game (enables or disables all sounds).
  */
  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    this.updateSoundIcon();
    if (!this.soundEnabled) {
      this.stopAllSounds();
      this.toggleBackgroundMusic(false);
    } else {
      this.toggleBackgroundMusic(true);
    }
  }

  /**
  * @description Stops all sounds in the game.
  */
  stopAllSounds() {
    if (this.level.endboss.length > 0) {
      this.level.endboss[0].enboss_sound.pause();
      this.level.endboss[0].alert_sound.pause();
    }
  }

  /**
  * @description Updates the sound icon based on the current sound state (enabled or disabled).
  */
  updateSoundIcon() {
    const soundIcon = document.getElementById('soundIcon');
    if (this.soundEnabled) {
      soundIcon.src = 'assets/icon/guitar.png';
    } else {
      soundIcon.src = 'assets/icon/no-music.png';
    }
  }
}
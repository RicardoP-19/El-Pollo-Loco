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
  soundEnabled = true;
  backgroundMusic;
  gameEnd = false;


  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.soundEnabled = true;
    this.draw();
    this.setWorld();
    this.run();
    this.gameMusic();
  }

  setWorld() {
    this.character.world = this;
    this.level.clouds.forEach(cloud => cloud.world = this);
    this.level.coins.forEach(coin => coin.world = this);
    this.level.bottles.forEach(bottle => bottle.world = this);
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkEndbossBar();
    }, 200)
  }

  checkCollisions() {
    this.characterAndChicken();
    this.collisionsBottle();
    this.characterAndCoins();
    this.characterAndBottles();
    this.characterAndEndboss();
  }

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

  isCharacterJumpingOnEnemy(enemy) {
    const characterBottom = this.character.y + this.character.height;
    const enemyTop = enemy.y - enemy.height;
    const isFalling = this.character.speedY < 0;
    return  isFalling && characterBottom >= enemyTop - 40 && 
            this.character.x + this.character.width > enemy.x &&
            this.character.x < enemy.x + enemy.width;
  }

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
    setTimeout(() => {
        this.level.enemies = this.level.enemies.filter(element => element !== enemy);
    }, 100);  
  }

  normalCollision() {    
    this.character.hit();
    this.statusBar.setPercentage(this.character.energy);
  }

  collisionsBottle() {
    this.ThrowableObject.forEach((bottle) => { 
      let interval = setInterval(() => {
        if (this.level.endboss[0].isColliding(bottle)) {
          bottle.bottleSplashFloor(interval);
          this.level.endboss[0].hit();
          this.endbossBar.setPercentage(this.level.endboss[0].energy);
        }
      }, 1000 / 150)
    })
  }

  characterAndCoins() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin) && this.coinBar.percentage < 100) {
      this.playSound('coin');
      this.level.coins.splice(index, 1);
      this.coinBar.setPercentage(this.coinBar.percentage + 10);         
      }
     });
  }

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

  characterAndEndboss() {
    let endboss = this.level.endboss[0];
    if (this.character.isColliding(endboss)) {
      this.character.hit();
      this.statusBar.setPercentage(this.character.energy);
    }
  }

  checkThrowObjects() {
    if(this.keyboard.D && this.collectedBottles > 0) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this);
      this.ThrowableObject.push(bottle);
      this.collectedBottles--;
      this.bottleBar.setPercentage(this.bottleBar.percentage - 10);
    }
  }

  checkEndbossBar() {
    let distance = this.endbossBar.x - this.character.x ;
    if (distance < -1600) {
      this.toggleBackgroundMusic(false);
      this.showEndbossBar = true;
      this.level.endboss[0].startAlert();
    }
  }

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

  drawCharacter() {
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0)
  }

  drawAllStatusBar() {
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    if (this.showEndbossBar) {
      this.addToMap(this.endbossBar);
    }
  }

  drawThrowableObject() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.ThrowableObject);
    this.ctx.translate(-this.camera_x, 0);
  }

  addObjectsToMap(objects){
    objects.forEach(object => {
        this.addToMap(object);
    });
  }

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

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1)
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  stopGame(ended) {
    this.stoppAllInterval();
    this.showEndScreen(ended);
  }

  showEndScreen(ended) {
    this.gameEnd = true;
    this.endScreenChoose(ended);
    this.endScreenTypeButtons();
  }

  endScreenChoose(ended) {
    document.getElementById('screenAndSound').classList.add('d-none');
    document.getElementById('endScreen').classList.remove('d-none');
    let endScreen = document.getElementById('endScreen');
    if (ended == 'win') {
      endScreen.src = 'assets/img/9_intro_outro_screens/win/win_2.png';
    } if (ended == 'lose' ) {
      endScreen.src = 'assets/img/9_intro_outro_screens/game_over/game over.png';
    }
  }

  endScreenTypeButtons() {
    const screenType = getScreenType();
    if (screenType === 'mobile') {
      gameEndMobileButtons();
    } else {
      gameEndDesktopButtons();
    }
  }

  stoppAllInterval() {
    this.intervalIds.forEach(clearInterval);
    this.intervalIds = [];
  }

  pushIntervall(interval) {
    world.intervalIds.push(interval); 
  }

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

  soundPause(sound) {
    sound.pause();
  }

  gameMusic() {
    this.soundEnabled = true;
    this.backgroundMusic = new Audio('assets/audio/el_pollo_loco_music.mp3');
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.2;
    this.toggleBackgroundMusic(true);
  }

  toggleBackgroundMusic(play) {
    if (this.soundEnabled && play) {
      this.backgroundMusic.play();
    } else {
      this.backgroundMusic.pause();
    }
  }

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

  stopAllSounds() {
    if (this.level.endboss.length > 0) {
      this.level.endboss[0].enboss_sound.pause();
      this.level.endboss[0].alert_sound.pause();
    }
  }

  updateSoundIcon() {
    const soundIcon = document.getElementById('soundIcon');
    if (this.soundEnabled) {
      soundIcon.src = 'assets/icon/guitar.png';
    } else {
      soundIcon.src = 'assets/icon/no-music.png';
    }
  }
}
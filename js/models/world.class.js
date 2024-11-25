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
  
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
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
  }

  characterAndChicken() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
          if (this.isCharacterJumpingOnEnemy(enemy)) {
              this.jumpCollision(enemy);
          } else {
              this.normalCollision(enemy);
          }
      }
    });
  }

  isCharacterJumpingOnEnemy(enemy) {
    const characterBottom = this.character.y + this.character.height;
    const enemyTop = enemy.y;
    return (
      this.character.isAboveGround() &&
      this.character.speedY > 0 &&
      characterBottom >= enemyTop &&
      characterBottom <= enemyTop + 90
    );
  }

  jumpCollision(enemy) {
    if (enemy instanceof SmallChicken) {
      enemy.loadImage(enemy.IMAGES_DEAD[0]);
    } else if (enemy instanceof Chicken) {
      enemy.loadImage(enemy.IMAGE_DEAD[0]);
    }
    enemy.isDead = true;
    enemy.speed = 0;
    setTimeout(() => {
        this.level.enemies = this.level.enemies.filter(element => element !== enemy);
    }, 300);
  }

  normalCollision(enemy) {
    if (enemy.energy > 0) {      
      this.character.hit();
      this.statusBar.setPercentage(this.character.energy);
    }
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
      this.level.coins.splice(index, 1);
      this.coinBar.setPercentage(this.coinBar.percentage + 10);         
      }
     });
  }

  characterAndBottles() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle) && this.bottleBar.percentage < 100) {
      this.level.bottles.splice(index, 1);      
      this.bottleBar.setPercentage(this.bottleBar.percentage + 10);
      this.collectedBottles++;             
      }
     });
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

  addObjectsToMap(objects) {
    objects.forEach(object => {
      if (!object.isDead || object instanceof ThrowableObject) { 
          this.addToMap(object);
      } else {
          this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
      }
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

  stopGame() {
    this.intervalIds.forEach(clearInterval);
    this.intervalIds = [];
  }

  pushIntervall(interval) {
    world.intervalIds.push(interval); 
  }
}
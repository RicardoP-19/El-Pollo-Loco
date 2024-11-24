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
  ThrowableObject = [];
  bottle = new ThrowableObject();
  intervalIds = [];
  
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
  }

  characterAndChicken() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
       this.character.hit();
       this.statusBar.setPercentage(this.character.energy);
      }
     });
  }

  collisionsBottle() {
    this.ThrowableObject.forEach((bottle) => { 
      let interval = setInterval(() => {
        if (this.level.enemies[6].isColliding(bottle)) {
          bottle.bottleSplashFloor(interval);
          this.level.enemies[6].hit();
          this.endbossBar.setPercentage(this.level.enemies[6].energy);
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

  checkThrowObjects() {
    if(this.keyboard.D) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this);
      this.ThrowableObject.push(bottle);
    }
  }

  checkEndbossBar() {
    let endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
    let distance = this.endbossBar.x - this.character.x ;
    if (distance < -1600) {
      this.showEndbossBar = true;
      endboss.startAlert();
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
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
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
    objects.forEach(o => {
      this.addToMap(o);
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
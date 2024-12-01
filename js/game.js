let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;

function openMenu() {
  document.getElementById('start').classList.add('d-none');
  document.getElementById('menuBtn').classList.add('d-none');
  document.getElementById('menu').classList.remove('d-none');
  document.getElementById('infoBtn').classList.remove('d-none');
}

function startGame() {
  document.getElementById('start').classList.add('d-none');
  document.getElementById('menuBtn').classList.add('d-none');
  document.getElementById('canvas').classList.remove('d-none');
  gameStarted = true;
  init();
}

function openStory() {
  document.getElementById('control').classList.add('d-none');
  document.getElementById('story').classList.remove('d-none');
}

function openControl() {
  document.getElementById('control').classList.remove('d-none');
  document.getElementById('story').classList.add('d-none');
}

function returnToMenu() {
  document.getElementById('menu').classList.add('d-none');
  document.getElementById('infoBtn').classList.add('d-none');
  document.getElementById('start').classList.remove('d-none');
  document.getElementById('menuBtn').classList.remove('d-none');
}

function restartGame() {
  gameStarted = false;
  document.getElementById('gameEnd').classList.add('d-none');
  document.getElementById('endScreen').classList.add('d-none');
  startGame();
}

function exitGame() {
  gameStarted = false;
  document.getElementById('gameEnd').classList.add('d-none');
  document.getElementById('endScreen').classList.add('d-none');
  document.getElementById('canvas').classList.add('d-none');
  document.getElementById('menuBtn').classList.remove('d-none');
  document.getElementById('start').classList.remove('d-none');
}

function init() {
  initLevel();
  canvas =  document.getElementById('canvas');
  world = new World(canvas, keyboard);
}

addEventListener('keydown', (event) => {
  if (event.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (event.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (event.keyCode == 38) {
    keyboard.UP = true;
  }
  if (event.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (event.keyCode == 68) {
    keyboard.D = true;
  }
});

addEventListener('keyup', (event) => {
  if (event.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (event.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (event.keyCode == 38) {
    keyboard.UP = false;
  }
  if (event.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (event.keyCode == 68) {
    keyboard.D = false;
  }
});
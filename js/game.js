let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let isMenuVisible = false;

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

function toggleFullscreen() {
  const element = document.getElementById('fullscreen');
  const menuButtons = document.getElementById('fullScreenMenu');
  const gameEndImage = document.getElementById('gameWindow');
  const image = document.getElementById('fullScreenImage');
  if (!document.fullscreenElement) {
      openFullscreen(element);
      fullscreenImage(element, menuButtons, gameEndImage, image);
  } else {
      closeFullscreen();
      minimalImages(element, menuButtons, gameEndImage, image);
  }
}

function fullscreenImage(element, menuButtons, gameEndImage, image) {
  if(image) image.src = 'assets/icon/minimumscreen.png';
  element.classList.add('fullscrenn');
  menuButtons.classList.add('fullscreen-menu');
  gameEndImage.classList.add('win-lose-fullscreen');
}

function minimalImages(element, menuButtons, gameEndImage, image) {
  if(image) image.src = 'assets/icon/fullscreen.png';
  element.classList.remove('fullscrenn');
  menuButtons.classList.remove('fullscreen-menu');
  gameEndImage.classList.remove('gameWindow');
}

function openFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

function closeFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

window.addEventListener('resize', checkHomeScreen);
window.addEventListener('resize', checkMenuScreenOnResize);

function checkHomeScreen() {
  if (window.innerWidth < 740 || window.innerHeight < 700) {
    mobileHomeScreen();
  } else {
    desktopHomeScreen();
  }
}

function checkMenuScreenOnResize() {
  if (isMenuVisible) {
    checkMenuScreen();
  }
}

function checkMenuScreen() {
  if (window.innerWidth < 740 || window.innerHeight < 700) {
    openMobileMenu();
  } else {
    openMenu();
  }
}

function mobileHomeScreen() {
  document.getElementById('headline').classList.add('d-none');
  document.getElementById('menuBtn').classList.add('d-none');
  document.getElementById('imprint').classList.add('d-none');
  document.getElementById('mobileMenuBtn').classList.remove('d-none');
  document.getElementById('mobileImprint').classList.remove('d-none');
}

function desktopHomeScreen() {
  document.getElementById('mobileMenuBtn').classList.add('d-none');
  document.getElementById('mobileImprint').classList.add('d-none');
  document.getElementById('headline').classList.remove('d-none');
  document.getElementById('menuBtn').classList.remove('d-none');
  document.getElementById('imprint').classList.remove('d-none');
}

function openMenu() {
  isMenuVisible = true;
  document.getElementById('start').classList.add('d-none');
  document.getElementById('infoBtnMobile').classList.add('d-none');
  document.getElementById('menu').classList.remove('d-none');
  document.getElementById('infoBtn').classList.remove('d-none');
}

function openMobileMenu() {
  isMenuVisible = true;
  document.getElementById('start').classList.add('d-none');
  document.getElementById('infoBtn').classList.add('d-none');
  document.getElementById('menu').classList.remove('d-none');
  document.getElementById('infoBtnMobile').classList.remove('d-none');
}

function startGame() {
  document.getElementById('start').classList.add('d-none');
  document.getElementById('menuBtn').classList.add('d-none');
  document.getElementById('canvas').classList.remove('d-none');
  gameStarted = true;
  init();
  setTimeout(() => {document.getElementById('screenAndSound').classList.remove('d-none')}, 500);
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
  isMenuVisible = false;
  document.getElementById('menu').classList.add('d-none');
  document.getElementById('infoBtn').classList.add('d-none');
  document.getElementById('start').classList.remove('d-none');
  document.getElementById('menuBtn').classList.remove('d-none');
}

function returnToMobileMenu() {
  isMenuVisible = false;
  document.getElementById('menu').classList.add('d-none');
  document.getElementById('infoBtn').classList.add('d-none');
  document.getElementById('menuBtn').classList.add('d-none');
  document.getElementById('infoBtnMobile').classList.add('d-none');
  document.getElementById('start').classList.remove('d-none');
}

function restartGame() {
  gameStarted = false;
  document.getElementById('screenAndSound').classList.add('d-none');
  document.getElementById('gameEnd').classList.add('d-none');
  document.getElementById('endScreen').classList.add('d-none');
  startGame();
}

function exitGame() {
  gameStarted = false;
  document.getElementById('gameEnd').classList.add('d-none');
  document.getElementById('endScreen').classList.add('d-none');
  document.getElementById('canvas').classList.add('d-none');
  document.getElementById('screenAndSound').classList.add('d-none');
  document.getElementById('menuBtn').classList.remove('d-none');
  document.getElementById('start').classList.remove('d-none');
}
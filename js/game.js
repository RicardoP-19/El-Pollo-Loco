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

function initTouchControls() {
  const buttons = {
    leftBtn: 'LEFT',
    rightBtn: 'RIGHT',
    upBtn: 'UP',
    bottleBtn: 'D'
  };
  
  Object.keys(buttons).forEach(btnId => {
    const btn = document.getElementById(btnId);
    btn.addEventListener('touchstart', () => keyboard[buttons[btnId]] = true);
    btn.addEventListener('touchend', () => keyboard[buttons[btnId]] = false);
  });
}

function toggleFullscreen() {
  const element = document.getElementById('fullscreen');
  const gameEndImage = document.getElementById('gameWindow');
  const image = document.getElementById('fullScreenImage');
  if (!document.fullscreenElement) {
      openFullscreen(element);
      fullscreenImage(element, gameEndImage, image);
  } else {
      closeFullscreen();
      minimalImages(element, gameEndImage, image);
  }
}

function fullscreenImage(element, gameEndImage, image) {
  if(image) image.src = 'assets/icon/minimumscreen.png';
  element.classList.add('fullscrenn');
  gameEndImage.classList.add('win-lose-fullscreen');
}

function minimalImages(element, gameEndImage, image) {
  if(image) image.src = 'assets/icon/fullscreen.png';
  element.classList.remove('fullscrenn');
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

function getScreenType() {
  return (window.innerWidth < 740 || window.innerHeight < 700) ? 'mobile' : 'desktop';
}

window.addEventListener('resize', () => {
  const screenType = getScreenType();
  checkRotateScreen()
  checkHomeScreen(screenType);
  checkMenuScreenOnResize(screenType);
  openGameButtons(screenType);
});

window.addEventListener('load', () => {
  const screenType = getScreenType();
  checkRotateScreen()
  checkHomeScreen(screenType);
  checkMenuScreenOnResize(screenType);
  openGameButtons(screenType);
});

function checkRotateScreen() {
  const screenType = getScreenType();
  const rotateScreen = document.getElementById('rotateScreen');
  if (screenType === 'mobile') {
    if (window.innerWidth < window.innerHeight) {
      rotateScreen.classList.remove('d-none');
    } else {
      rotateScreen.classList.add('d-none');
    }
  }
}

function checkHomeScreen(screenType) {
  if (screenType === 'mobile') {
    mobileHomeScreen();
  } else {
    desktopHomeScreen();
  }
}

function checkMenuScreenOnResize(screenType) {
  if (isMenuVisible) {
    checkMenuScreen(screenType);
  }
}

function checkMenuScreen(screenType) {
  if (screenType === 'mobile') {
    openMobileMenu();
  } else {
    openMenu();
  }
}

function openGameButtons(screenType) {
  if (world && world.gameEnd) {
    if (screenType === 'mobile') {
      gameEndMobileButtons();
    } else {
      gameEndDesktopButtons();      
    }
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
  if (!gameStarted) {
    document.getElementById('imprint').classList.remove('d-none'); 
  }
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
  document.getElementById('gameContainer').classList.add('d-none');
  document.getElementById('infoBtnMobile').classList.add('d-none');
  document.getElementById('start').classList.remove('d-none');
}

function startGame() {
  if (getScreenType() === 'mobile') {
    initMobileScreen();
    initTouchControls();
  } else {
    initDesktopScreen();
  }
  gameStarted = true;
  init();
  setTimeout(() => {document.getElementById('screenAndSound').classList.remove('d-none')}, 500);
}

function initMobileScreen() {
  document.getElementById('start').classList.add('d-none');
  document.getElementById('gameContainer').classList.remove('d-none');
  document.getElementById('canvas').classList.remove('d-none');
  setTimeout(() => {document.getElementById('mobilPlayBtn').classList.remove('d-none')}, 500);
}

function initDesktopScreen() {
  document.getElementById('start').classList.add('d-none');
  document.getElementById('menuBtn').classList.add('d-none');
  document.getElementById('imprint').classList.add('d-none');
  document.getElementById('gameContainer').classList.remove('d-none');
  document.getElementById('canvas').classList.remove('d-none');
}

function gameEndMobileButtons() {
  document.getElementById('gameEndMobil').classList.remove('d-none');
  document.getElementById('gameEnd').classList.add('d-none');
}

function gameEndDesktopButtons() {
  document.getElementById('gameEndMobil').classList.add('d-none');
  document.getElementById('gameEnd').classList.remove('d-none');
}

function restartGame() {
  gameStarted = false;
  world.gameEnd = false;
  closeEndScreen();
  startGame();
}

function exitGame() {
  gameStarted = false;
  world.gameEnd = false;
  const screenType = getScreenType();
  if (screenType === 'mobile') {
    closeEndScreen();
    returnToMobileMenu();
  } else {
    closeEndScreen();
    returnToMenu();
  }
}

function closeEndScreen() {
  document.getElementById('canvas').classList.add('d-none');
  document.getElementById('endScreen').classList.add('d-none');
  document.getElementById('gameEnd').classList.add('d-none');
  document.getElementById('gameEndMobil').classList.add('d-none');
}

function openImprint() {
  document.getElementById('start').classList.add('d-none');
  document.getElementById('menuBtn').classList.add('d-none');
  document.getElementById('imprint').classList.add('d-none');
  document.getElementById('imprintContainer').classList.remove('d-none');
}

function closeImprint() {
  document.getElementById('imprintContainer').classList.add('d-none');
  const screenType = getScreenType();
  if (screenType === 'mobile') {
    returnToMobileMenu();
  } else {
    returnToMenu();
  }
}
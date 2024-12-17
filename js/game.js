let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let isMenuVisible = false;

/**
 * Starts the game by initializing necessary screens and controls.
 */
function startGame() {
  if (getScreenType() === 'mobile') {
    initMobileScreen();
    initTouchControls();
  } else {
    initDesktopScreen();
  }
  init();
}

/**
 * Restarts the game after it ends.
 */
function restartGame() {
  resetGame();
  closeEndScreen();
  startGame();
}

/**
 * Exits the game and returns to the appropriate menu screen.
 */
function exitGame() {
  resetGame();
  const screenType = getScreenType();
  if (screenType === 'mobile') {
    closeEndScreen();
    returnToMobileMenu();
  } else {
    closeEndScreen();
    returnToMenu();
  }
}

function resetGame() {
  gameStarted = false;
  isMenuVisible = false;
  world.soundEnabled = false;
  world.backgroundMusic.currentTime = 0;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  level = null;
  world = null;
}

/**
 * Initializes the game by setting up the canvas and the game world.
 */
function init() {
  initLevel();
  canvas =  document.getElementById('canvas');
  world = new World(canvas, keyboard);
  console.log('Anzahl der ID beim Start', world.intervalIds);  
  gameStarted = true;
}

/**
 * Closes the imprint screen and returns to the appropriate menu.
 */
function closeImprint() {
  document.getElementById('imprintContainer').classList.add('d-none');
  const screenType = getScreenType();
  if (screenType === 'mobile') {
    returnToMobileMenu();
  } else {
    returnToMenu();
  }
}

/**
 * Adds event listeners for keyboard inputs.
 */
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

/**
 * Initializes touch controls for mobile devices.
 */
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

/**
 * Toggles fullscreen mode for the game.
 */
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

/**
 * Updates UI elements for fullscreen mode.
 * @param {HTMLElement} element - The fullscreen container element.
 * @param {HTMLElement} gameEndImage - The game window element.
 * @param {HTMLElement} image - The fullscreen toggle image.
 */
function fullscreenImage(element, gameEndImage, image) {
  if(image) image.src = 'assets/icon/minimumscreen.png';
  element.classList.add('fullscrenn');
  gameEndImage.classList.add('win-lose-fullscreen');
}

/**
 * Updates UI elements for minimized screen mode.
 * @param {HTMLElement} element - The fullscreen container element.
 * @param {HTMLElement} gameEndImage - The game window element.
 * @param {HTMLElement} image - The fullscreen toggle image.
 */
function minimalImages(element, gameEndImage, image) {
  if(image) image.src = 'assets/icon/fullscreen.png';
  element.classList.remove('fullscrenn');
  gameEndImage.classList.remove('gameWindow');
}

/**
 * Requests fullscreen for a given element.
 * @param {HTMLElement} element - The element to request fullscreen.
 */
function openFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode.
 */
function closeFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * Determines the screen type based on window dimensions.
 * @returns {string} "mobile" or "desktop".
 */
function getScreenType() {
  return (window.innerWidth < 740 || window.innerHeight < 700) ? 'mobile' : 'desktop';
}

/**
 * Handles screen resizing events to adjust UI and controls.
 */
window.addEventListener('resize', () => {
  const screenType = getScreenType();
  checkRotateScreen()
  checkHomeScreen(screenType);
  checkMenuScreenOnResize(screenType);
  openGameButtons(screenType);
});

/**
 * Handles the load event to initialize the game UI.
 */
window.addEventListener('load', () => {
  const screenType = getScreenType();
  checkRotateScreen()
  checkHomeScreen(screenType);
  checkMenuScreenOnResize(screenType);
  openGameButtons(screenType);
});

/**
 * Checks and adjusts the UI for screen rotation on mobile devices.
 */
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

/**
 * Adjusts the home screen UI based on screen type.
 * @param {string} screenType - "mobile" or "desktop".
 */
function checkHomeScreen(screenType) {
  if (screenType === 'mobile') {
    mobileHomeScreen();
  } else {
    desktopHomeScreen();
  }
}

/**
 * Adjusts the menu screen UI on resize if the menu is visible.
 * @param {string} screenType - "mobile" or "desktop".
 */
function checkMenuScreenOnResize(screenType) {
  if (isMenuVisible) {
    checkMenuScreen(screenType);
  }
}

/**
 * Opens the menu UI based on screen type.
 * @param {string} screenType - "mobile" or "desktop".
 */
function checkMenuScreen(screenType) {
  if (screenType === 'mobile') {
    openMobileMenu();
  } else {
    openMenu();
  }
}

/**
 * Opens game buttons depending on the screen type.
 * @param {string} screenType - "mobile" or "desktop".
 */
function openGameButtons(screenType) {
  if (world && world.gameEnd) {
    if (screenType === 'mobile') {
      gameEndMobileButtons();
    } else {
      gameEndDesktopButtons();      
    }
  }
}

/**
 * Displays the mobile version of the home screen.
 */
function mobileHomeScreen() {
  document.getElementById('headline').classList.add('d-none');
  document.getElementById('menuBtn').classList.add('d-none');
  document.getElementById('imprint').classList.add('d-none');
  document.getElementById('mobileMenuBtn').classList.remove('d-none');
  document.getElementById('mobileImprint').classList.remove('d-none');
}

/**
 * Displays the desktop version of the home screen.
 */
function desktopHomeScreen() {
  document.getElementById('mobileMenuBtn').classList.add('d-none');
  document.getElementById('mobileImprint').classList.add('d-none');
  document.getElementById('headline').classList.remove('d-none');
  document.getElementById('menuBtn').classList.remove('d-none');
  if (!gameStarted) {
    document.getElementById('imprint').classList.remove('d-none'); 
  }
}

/**
 * Opens the desktop version of the menu.
 */
function openMenu() {
  isMenuVisible = true;
  document.getElementById('start').classList.add('d-none');
  document.getElementById('infoBtnMobile').classList.add('d-none');
  document.getElementById('menu').classList.remove('d-none');
  document.getElementById('infoBtn').classList.remove('d-none');
}

/**
 * Opens the mobile version of the menu.
 */
function openMobileMenu() {
  isMenuVisible = true;
  document.getElementById('start').classList.add('d-none');
  document.getElementById('infoBtn').classList.add('d-none');
  document.getElementById('menu').classList.remove('d-none');
  document.getElementById('infoBtnMobile').classList.remove('d-none');
}

/**
 * Opens the story screen.
 */
function openStory() {
  document.getElementById('control').classList.add('d-none');
  document.getElementById('story').classList.remove('d-none');
}

/**
 * Opens the control screen.
 */
function openControl() {
  document.getElementById('control').classList.remove('d-none');
  document.getElementById('story').classList.add('d-none');
}

/**
 * Returns to the desktop menu from the current UI.
 */
function returnToMenu() {
  isMenuVisible = false;
  document.getElementById('menu').classList.add('d-none');
  document.getElementById('infoBtn').classList.add('d-none');
  document.getElementById('start').classList.remove('d-none');
  document.getElementById('menuBtn').classList.remove('d-none');
}

/**
 * Returns to the mobile menu from the current UI.
 */
function returnToMobileMenu() {
  isMenuVisible = false;
  document.getElementById('menu').classList.add('d-none');
  document.getElementById('infoBtn').classList.add('d-none');
  document.getElementById('menuBtn').classList.add('d-none');
  document.getElementById('gameContainer').classList.add('d-none');
  document.getElementById('infoBtnMobile').classList.add('d-none');
  document.getElementById('start').classList.remove('d-none');
}

/**
 * Initializes the mobile screen layout for the game.
 */
function initMobileScreen() {
  document.getElementById('start').classList.add('d-none');
  document.getElementById('gameContainer').classList.remove('d-none');
  document.getElementById('canvas').classList.remove('d-none');
  setTimeout(() => {document.getElementById('mobilPlayBtn').classList.remove('d-none')}, 500);
}

/**
 * Initializes the desktop screen layout for the game.
 */
function initDesktopScreen() {
  document.getElementById('start').classList.add('d-none');
  document.getElementById('menuBtn').classList.add('d-none');
  document.getElementById('imprint').classList.add('d-none');
  document.getElementById('gameContainer').classList.remove('d-none');
  document.getElementById('canvas').classList.remove('d-none');  
  setTimeout(() => {document.getElementById('screenAndSound').classList.remove('d-none')}, 500);
}

/**
 * Displays the game end buttons for mobile devices.
 */
function gameEndMobileButtons() {
  document.getElementById('gameEndMobil').classList.remove('d-none');
  document.getElementById('gameEnd').classList.add('d-none');
}

/**
 * Displays the game end buttons for desktop devices.
 */

function gameEndDesktopButtons() {
  document.getElementById('gameEndMobil').classList.add('d-none');
  document.getElementById('gameEnd').classList.remove('d-none');
}

/**
 * Closes the end screen and resets relevant UI elements.
 */
function closeEndScreen() {
  document.getElementById('screenAndSound').classList.add('d-none')
  document.getElementById('mobilPlayBtn').classList.add('d-none')
  document.getElementById('canvas').classList.add('d-none');
  document.getElementById('endScreen').classList.add('d-none');
  document.getElementById('gameEnd').classList.add('d-none');
  document.getElementById('gameEndMobil').classList.add('d-none');
}

/**
 * Displays the imprint on desktop devices.
 */
function openImprint() {
  document.getElementById('start').classList.add('d-none');
  document.getElementById('menuBtn').classList.add('d-none');
  document.getElementById('imprint').classList.add('d-none');
  document.getElementById('imprintContainer').classList.remove('d-none');
}
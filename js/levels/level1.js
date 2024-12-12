let level1;

/**
 * Initializes the game level by creating various objects, such as chickens, small chickens, endboss, clouds, coins, bottles, and background objects.
 * This function sets up the initial state for the level, which is an array of game elements that will appear on screen.
 * 
 * It creates:
 * - 6 regular chickens
 * - 7 small chickens
 * - 1 endboss
 * - 5 clouds
 * - 13 coins
 * - 15 bottles
 * - 20 background objects from different layers for the game's background.
 */
function initLevel() {
  level1 = new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken()
    ],
    [
      new Endboss(),
    ],
    [
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud()
    ],
    [
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin()
    ],
    [
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle()
    ],
    [
      new BackgroundObject('assets/img/5_background/layers/air.png', -719, 0),
      new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', -719, 0),
      new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', -719, 0),
      new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', -719, 0),

      new BackgroundObject('assets/img/5_background/layers/air.png', 0),
      new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 0),
      new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 0),
      new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 0),

      new BackgroundObject('assets/img/5_background/layers/air.png', 719, 0),
      new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 719, 0),
      new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 719, 0),
      new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 719, 0),

      new BackgroundObject('assets/img/5_background/layers/air.png', 719 * 2),
      new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 719 * 2),
      new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 719 * 2),
      new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 719 * 2),

      new BackgroundObject('assets/img/5_background/layers/air.png', 719 * 3),
      new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 719 * 3),
      new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 719 * 3),
      new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 719 * 3), 
    ]
  );
}
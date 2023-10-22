//Name: Sean Eric So
//Mod Title: Rocket Patrol: Reloaded v120
//Time it took to complete project: 8.5 hours
//Mods Chosen:
    // 1 Point - Track high score (DONE)
    // 1 Point - Implement the 'FIRE' UI text (DONE)
    // 1 Point - Adding music that loops in Play Scene (DONE)
    // 1 Point - New scrolling tile sprite for the background (DONE)
    // 1 Point - Allow player to control spaceship after firing (DONE)
    // 1 Point - Implement speed increase after 30 seconds (DONE)
    // 3 Points - Create 4 new explosion sound effects and randomize which one plays on impact (DONE)
    // 3 Points - Create new animated sprite for spaceships (DONE)
    // 3 Points - New title screen (DONE)
    // 5 Points - New enemy spaceship that is smaller, faster, and worth more points (DONE)
//Citations

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play] //Defines scenes of the game provided by classes
};

let game = new Phaser.Game(config); //Creating game

//Setting UI Sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

//Reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT;

//Reserve for high scores of repsective difficulties
let highScoreExpert = 0;
let highScoreNovice = 0;

//Reserve for difficulty selected
let difficultyChosen;
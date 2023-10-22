//Name: Sean Eric So
//Mod Title: Rocket Patrol Reloaded
//Time it took to complete project: 10 hours
//Mods Chosen:
    // 1 Point - Track high score (DONE)
    // 1 Point - Adding music that loops in Play Scene (DONE)
    // 1 Point - New scrolling tile sprite for the background (DONE)
    // 1 Point - Allow player to control spaceship after firing (DONE)
    // 3 Points - Create new animated sprite for spaceships (DONE)
    // 3 Points - New title screen
    // 5 Points - New enemy spaceship that is smaller, faster, and worth more points
    // 5 Points
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
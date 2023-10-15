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
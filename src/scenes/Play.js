class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        //Loading images and tile sprites
        this.load.image("rocket", './assets/rocket.png'); //Assigning key name and graphic reference
        this.load.image("spaceship", './assets/spaceship.png');
        this.load.image("starfield", './assets/starfield.png');
    }

    create(){
        //Placing tile sprite; needs to go before the UI commands so that it appears in front
        this.starfield = this.add.tileSprite(0, 0, 640, 480, "starfield").setOrigin(0, 0); //'this' makes the starfield within the scope of this scene

        //Green UI Background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        //White Borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        //Adding rocket (P1)
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        //Defining keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        this.starfield.tilePositionX -= 4; //Moves starfield horizontally left by 4 pixels every frame
        this.p1Rocket.update(); //Allows rocket's updates to occur
    }
}
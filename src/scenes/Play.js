class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        //Loading images and tile sprites
        this.load.image("rocket", './assets/rocket.png'); //Assigning key name and graphic reference
        this.load.image("spaceship", './assets/spaceship.png');
        this.load.image("starfield", './assets/starfield.png');

        //Loading spritesheet
        this.load.spritesheet("explosion", './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
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

        //Adding spaceships x3
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0, 0);

        //Defining keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //Animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers("explosion", {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        //Initialising score
        this.p1Score = 0; //In create() because if in update(), score would never increase beyond 0

        //Display score
        let scoreConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#F3B141", //Don't forget the #'s
            color: "#843605",
            align: "right",
            padding:{
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig); //x, y, text to display, configuration
    
        //GAME OVER Flag
        this.gameOver = false;

        // 60-second Play Clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => { //Parameters: time that will elapse (in milliseconds), the callback function itself, any arguments we might want to pass to the callback (in this case, null), and the callback context
            this.add.text(game.config.width / 2, game.config.height / 2, "GAME OVER", scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press "R" to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update(){
        //Check key input for restart or exit
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4; //Moves starfield horizontally left by 4 pixels every frame
        if(!this.gameOver){ //If game isn't over
            this.p1Rocket.update(); //Allows rocket's updates to occur
            this.ship01.update(); //Updating spaceships
            this.ship02.update();
            this.ship03.update();
        }

        //Checking for collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship){
        if(rocket.x < ship.x + ship.width && // simple AABB checking
        rocket.x + rocket.width > ship.x &&
        rocket.y < ship.y + ship.height &&
        rocket.height + rocket.y > ship.y){
            return true;
        } else{
            return false;
        }
    }

    shipExplode(ship){
        ship.alpha = 0; //Temporarily hides ship

        //Create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode'); //Plays explode animation
        boom.on('animationcomplete', () => { //Play explode animation; The boom.on() function is an animation event that fires when a certain condition is met
            ship.reset(); //Reset ship position
            ship.alpha = 1; //Make ship visible again
            boom.destroy(); //Remove explosion sprite
        });

        //Score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        //Playing SFX
        this.sound.play("sfx_explosion");
    }
}
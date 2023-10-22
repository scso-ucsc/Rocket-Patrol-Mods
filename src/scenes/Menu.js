class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){ //Preloaded in Menu scene, so they’re ready to use anywhere else in the game
        //Loading audio 
        this.load.audio("sfx_select", './assets/blip_select12.wav');
        this.load.audio("sfx_explosion1", './assets/explosion38.wav');
        this.load.audio("sfx_rocket", './assets/rocket_shot.wav');
        this.load.audio("play_audio", './assets/adventure_meme.wav'); //By Kevin Macleod: https://www.youtube.com/watch?v=s7iUL1pyAjQ
        this.load.audio("sfx_explosion2", './assets/explosion2.wav'); //Loading 4 new explosions
        this.load.audio("sfx_explosion3", './assets/explosion3.wav');
        this.load.audio("sfx_explosion4", './assets/explosion4.wav');
        this.load.audio("sfx_explosion5", './assets/explosion5.wav');

        //Loading images
        this.load.image("starfield", './assets/starfield.png');

        //Loading spritesheet
        this.load.spritesheet("spaceship_new", './assets/spritesheets/spaceship_new.png', {
            frameWidth: 63,
            frameHeight: 32
        });
        this.load.spritesheet("spaceship_elite", './assets/spritesheets/spaceship_elite.png', {
            frameWidth: 48,
            frameHeight: 24
        });
    }

    create(){
        //Adding background details
        this.starfield = this.add.tileSprite(0, 0, 640, 480, "starfield").setOrigin(0, 0);

        let titleConfig = {
            fontFamily: "Lexend",
            fontSize: "36px",
            backgroundColor: "#2F6AB5", //Don't forget the #'s
            color: "#DDDDDD",
            align: "right",
            padding:{
                top: 10,
                bottom: 10,
                left: 20,
                right: 20
            },
            fixedWidth: 0
        }
        let menuConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#F2E366", //Don't forget the #'s
            color: "#66410E",
            align: "right",
            padding:{
                top: 5,
                bottom: 5,
                left: 10,
                right: 10
            },
            fixedWidth: 0
        }
        let scoreStatsConfig = {
            fontFamily: "Courier",
            fontSize: "18px",
            color: "#FFFFFF",
            align: "left"
        }

        //Showing menu text
        this.add.text(game.config.width / 2, game.config.height - 425, "ROCKET PATROL: RELOADED v120", titleConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height - 310, "Use ←→ arrows to move & (F) to fire", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height - 360, "Hit enemy spaceships to earn points", menuConfig).setOrigin(0.5);
        menuConfig.fontSize = "21px";
        this.add.text(game.config.width / 2, game.config.height - 150, "Farther and faster ships are worth more points!", menuConfig).setOrigin(0.5);
        menuConfig.fontSize = "28px";
        menuConfig.backgroundColor = "#00FF00";
        menuConfig.color = "#0000DD";
        this.add.text(game.config.width / 2, game.config.height - 75, "Press ← for Novice or → for Expert", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 4 - 20, game.config.height - 25, "Novice High Score: " + highScoreNovice, scoreStatsConfig).setOrigin(0.5);
        this.add.text(game.config.width / 4 * 3 + 22, game.config.height - 25, "Expert High Score: " + highScoreExpert, scoreStatsConfig).setOrigin(0.5);

        //Creating animations
        this.anims.create({
            key: "spaceship_new_fly",
            frames: this.anims.generateFrameNames("spaceship_new", {start: 0, end: 3}),
            repeat: -1, //Makes it loop
            frameRate: 30
        });
        this.anims.create({
            key: "spaceship_elite_fly",
            frames: this.anims.generateFrameNames("spaceship_elite", {start: 0, end: 3}),
            repeat: -1, //Makes it loop
            frameRate: 30
        });

        //Adding ships for display
        this.shipDemoNormal = this.add.sprite(game.config.width / 4 * 3 - 50, game.config.height / 2 + 10, "spaceship_new").setOrigin(0.5).setScale(1.75);
        this.shipDemoElite = this.add.sprite(game.config.width / 4 + 50, game.config.height / 2 + 10, "spaceship_elite").setOrigin(0.5).setScale(1.75);
        this.shipDemoNormal.play("spaceship_new_fly");
        this.shipDemoElite.play("spaceship_elite_fly");

        //Defining Keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){ //Easy mode
            difficultyChosen = "Novice";
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play("sfx_select");
            this.scene.start("playScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){ //Hard mode
            difficultyChosen = "Expert";
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play("sfx_select");
            this.scene.start("playScene");
        }
    }
}
// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //Add object to existing scene
        scene.add.existing(this);
        
        this.isFiring = false; //Track if rocket is firing
        this.moveSpeed = 2; //Pixels per frame

        this.sfxRocket = scene.sound.add("sfx_rocket"); //Adding rocket SFX
    }

    update(){
        //Left-Right Movement
        //if(!this.isFiring){
        if(keyLEFT.isDown && this.x >= borderUISize + this.width){
            this.x -= this.moveSpeed;
        } else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
            this.x += this.moveSpeed;
        }

        //Firing Button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) { //Makes sure that the sound effect will only play when the rocket first launches
            this.isFiring = true;
            this.sfxRocket.play();
        }

        //If fired move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){
            this.y -= this.moveSpeed;
        }

        //Reset on miss
        if(this.y <= borderUISize * 3 + borderPadding){
            this.reset();
        }
    }

    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}
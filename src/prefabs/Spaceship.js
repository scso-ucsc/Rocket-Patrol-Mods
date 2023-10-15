class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to existing scene
        this.points = pointValue; //to store point value
        this.moveSpeed = game.settings.spaceshipSpeed; //pixels per frame
    }

    update(){
        this.x -= this.moveSpeed; //move spaceship left
        if(this.x <= 0 - this.width){ //wrap around from left to right
            this.reset();
        }
    }

    reset(){
        this.x = game.config.width;
    }
}
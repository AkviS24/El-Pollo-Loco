class Chicken extends Character {

    y = 370;

    IMAGES_WALKING = [
        "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
    ];

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };


    constructor() {
        super();
        this.loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.height = 60;
        this.width = 60;
        this.x = 1800 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25; // Zufällige Geschwindigkeit zwischen 0.15 und 0.4
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    };

    animate() {
        // store IDs on the object so we can register them later if world
        // wasn't set yet when this constructor ran
        this.moveInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        this.animInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
        if (this.world && this.world.intervals) {
            this.world.intervals.push(this.moveInterval, this.animInterval);
        }
    }; 
}
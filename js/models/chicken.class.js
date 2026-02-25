class Chicken extends Character {

    y = 370;

    IMAGES_WALKING = [
        "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
    ];


    constructor() {
        super();
        this.loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.height = 60;
        this.width = 60;
        this.x = 2100 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25; // Zufällige Geschwindigkeit zwischen 0.15 und 0.4
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    };

    animate() {
        setInterval(() => {
                    this.moveLeft();
                }, 1000 / 60);
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    };
}
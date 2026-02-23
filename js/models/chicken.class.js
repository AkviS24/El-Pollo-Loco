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
        this.x = 300 + Math.random() * 500;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    };

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length; // Wenn am Ende des Arrays fängt er wieder von vorne an
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
    };
};
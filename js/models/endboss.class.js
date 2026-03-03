class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 60;
    energy = 40; // benötigt dreißig Treffer (2 Energie pro Hit)

    IMAGES_WALKING = [
        "./img/4_enemie_boss_chicken/2_alert/G5.png",
        "./img/4_enemie_boss_chicken/2_alert/G6.png",
        "./img/4_enemie_boss_chicken/2_alert/G7.png",
        "./img/4_enemie_boss_chicken/2_alert/G8.png",
        "./img/4_enemie_boss_chicken/2_alert/G9.png",
        "./img/4_enemie_boss_chicken/2_alert/G10.png",
        "./img/4_enemie_boss_chicken/2_alert/G11.png",
        "./img/4_enemie_boss_chicken/2_alert/G12.png"
    ];

    offset = {
        top: 50,
        bottom: 10,
        left: 30,
        right: 10
    };

    constructor() {
        super();
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGES_WALKING[0]);
        this.x = 1800;
        this.animate();
    }

    animate() {
        this.animInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
        if (this.world && this.world.intervals) {
            this.world.intervals.push(this.animInterval);
        }
    };  
}
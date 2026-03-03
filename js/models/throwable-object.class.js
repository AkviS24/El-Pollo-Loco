class ThrowableObject extends MovableObject {

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    IMAGES_ROTATION = [
        "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
    ];

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 60;
        this.loadImage("./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
        this.loadImages(this.IMAGES_ROTATION);
        this.throw();
        this.animate();
    }

    throw() {
        this.speedY = 30;
        this.speed = 10;
        this.applyGravity();
        let flightId = setInterval(() => {
            this.x += 10;
        }, 25);
        if (this.world && this.world.intervals) {
            this.world.intervals.push(flightId);
        }
    }

    animate() {
        let animId = setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION);
        }, 100);
        if (this.world && this.world.intervals) {
            this.world.intervals.push(animId);
        }
    }
}
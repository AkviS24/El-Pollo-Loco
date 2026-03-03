class CoinAnimation extends MovableObject {
    

    IMAGES = [
        "./img/8_coin/coin_1.png",
        "./img/8_coin/coin_2.png"
    ];

    constructor(world, x, y) {
        super();
        this.world = world;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.speedY = 1;

        this.loadImages(this.IMAGES);
        this.loadImage(this.IMAGES[0]);

        this.animate();

        setTimeout(() => {
            clearInterval(this.interval);
            let idx = this.world.coinAnimations.indexOf(this);
            if (idx >= 0) this.world.coinAnimations.splice(idx, 1);
        }, 1000);
    }

    animate() {
        this.interval = setInterval(() => {
            this.playAnimation(this.IMAGES);
            this.y -= this.speedY;
        }, 100);
        if (this.world && this.world.intervals) {
            this.world.intervals.push(this.interval);
        }
    }
}

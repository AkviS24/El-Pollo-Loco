/**
 * Kleine Münz-Animation, die aufsteigt, wenn Pepe ein Huhn besiegt
 * und dafür eine Münze als Belohnung bekommt.
 *
 * @extends MovableObject
 */
class CoinAnimation extends MovableObject {

    /**
     * Breite der Animation
     * @type {number}
     */
    width = 60;

    /**
     * Höhe der Animation
     * @type {number}
     */
    height = 60;

    /**
     * Bilder für die Münz-Animation
     * @type {string[]}
     */
    IMAGES = [
        "./img/8_coin/coin_1.png",
        "./img/8_coin/coin_2.png"
    ];

    /**
     * Erstellt eine neue Münz-Animation, die nach einer Sekunde verschwindet.
     *
     * @param {number} x - X-Position der Animation
     * @param {number} y - Y-Position der Animation
     */
    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.animate();
        setTimeout(() => this.remove(), 1000);
    }

    /** Spielt die Animation ab und bewegt die Münze dabei nach oben. */
    animate() {
        this.addInterval(() => {
            this.playAnimation(this.IMAGES);
            this.y -= 3;
        }, 50);
    }
}

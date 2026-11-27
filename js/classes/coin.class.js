/**
 * Eine Münze, die in der Luft schwebt und von Pepe eingesammelt werden kann.
 *
 * @extends MovableObject
 */
class Coin extends MovableObject {

    /**
     * Breite der Münze
     * @type {number}
     */
    width = 100;

    /**
     * Höhe der Münze
     * @type {number}
     */
    height = 100;

    /**
     * Kollisions-Offset – das Münzbild hat viel transparenten Rand.
     * @type {{top:number, bottom:number, left:number, right:number}}
     */
    offset = { top: 32, bottom: 32, left: 32, right: 32 };

    /**
     * Bilder für die pulsierende Animation
     * @type {string[]}
     */
    IMAGES = [
        "./img/8_coin/coin_1.png",
        "./img/8_coin/coin_2.png"
    ];

    /**
     * Erstellt eine neue Münze.
     *
     * @param {number} x - X-Position im Level
     * @param {number} y - Y-Position im Level
     */
    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.animate();
    }

    /** Startet die pulsierende Animation der Münze. */
    animate() {
        this.addInterval(() => this.playAnimation(this.IMAGES), 300);
    }
}

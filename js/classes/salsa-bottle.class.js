/**
 * Eine Salsa-Flasche, die am Boden liegt und eingesammelt werden kann.
 *
 * @extends MovableObject
 */
class SalsaBottle extends MovableObject {

    /**
     * Breite der Flasche
     * @type {number}
     */
    width = 80;

    /**
     * Höhe der Flasche
     * @type {number}
     */
    height = 80;

    /**
     * Y-Position (liegt auf dem Boden)
     * @type {number}
     */
    y = 350;

    /**
     * Kollisions-Offset der Flasche.
     * @type {{top:number, bottom:number, left:number, right:number}}
     */
    offset = { top: 15, bottom: 8, left: 26, right: 22 };

    /**
     * Zwei Varianten der am Boden liegenden Flasche
     * @type {string[]}
     */
    IMAGES = [
        "./img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "./img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
    ];

    /**
     * Erstellt eine neue Flasche mit zufälliger Ausrichtung.
     *
     * @param {number} x - X-Position im Level
     */
    constructor(x) {
        super();
        this.loadImage(this.IMAGES[Math.round(Math.random())]);
        this.x = x;
    }
}

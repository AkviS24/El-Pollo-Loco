/**
 * Repräsentiert eine Wolke im Hintergrund des Spiels.
 * Wolken ziehen langsam nach links und beginnen am Levelende wieder von vorn.
 *
 * @extends MovableObject
 */
class Cloud extends MovableObject {

    /**
     * Y-Position der Wolke
     * @type {number}
     */
    y = 0;

    /**
     * Breite der Wolke
     * @type {number}
     */
    width = 720;

    /**
     * Höhe der Wolke
     * @type {number}
     */
    height = 405;

    /**
     * Geschwindigkeit der Wolke
     * @type {number}
     */
    speed = 0.12;

    /**
     * Strecke, um die eine Wolke nach dem Verlassen des Levels versetzt wird
     * @type {number}
     */
    loopWidth = 720 * 6;

    /**
     * Erstellt eine neue Wolke.
     *
     * @param {number} x - X-Position im Level
     * @param {string} imagePath - Pfad zum Wolkenbild
     */
    constructor(x, imagePath) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.animate();
    }

    /** Startet die Bewegung der Wolke. */
    animate() {
        this.addInterval(() => this.drift(), 1000 / 60);
    }

    /** Bewegt die Wolke nach links und setzt sie am Ende wieder nach rechts. */
    drift() {
        this.moveLeft();
        if (this.x + this.width < -720) this.x += this.loopWidth;
    }
}

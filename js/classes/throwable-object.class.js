/**
 * Eine geworfene Salsa-Flasche.
 * Fliegt in Blickrichtung von Pepe in einem Bogen, dreht sich dabei
 * und zerplatzt beim Aufprall auf einen Gegner oder den Boden.
 *
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {

    /**
     * Breite der Flasche
     * @type {number}
     */
    width = 60;

    /**
     * Höhe der Flasche
     * @type {number}
     */
    height = 60;

    /**
     * Y-Position, ab der die Flasche den Boden berührt
     * @type {number}
     */
    groundY = 360;

    /**
     * Horizontale Fluggeschwindigkeit
     * @type {number}
     */
    speed = 10;

    /**
     * Flugrichtung: 1 = rechts, -1 = links
     * @type {number}
     */
    direction = 1;

    /**
     * TRUE, sobald die Flasche zerplatzt
     * @type {boolean}
     */
    isSplashing = false;

    /**
     * Kollisions-Offset der Flasche.
     * @type {{top:number, bottom:number, left:number, right:number}}
     */
    offset = { top: 10, bottom: 10, left: 12, right: 12 };

    /**
     * Bilder für die Rotationsanimation
     * @type {string[]}
     */
    IMAGES_ROTATION = [
        "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
    ];

    /**
     * Bilder für die Zerplatz-Animation
     * @type {string[]}
     */
    IMAGES_SPLASH = [
        "./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "./img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "./img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "./img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "./img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "./img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png"
    ];

    /**
     * Erstellt eine neue Flasche an Pepes Hand und wirft sie.
     *
     * @param {number} x - Start-X-Position
     * @param {number} y - Start-Y-Position
     * @param {boolean} toLeft - TRUE, wenn nach links geworfen wird
     */
    constructor(x, y, toLeft) {
        super();
        this.loadImage(this.IMAGES_ROTATION[0]);
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.direction = toLeft ? -1 : 1;
        this.throw();
        this.animate();
    }

    /**
     * Startet den Wurf: Bogen nach oben, Gravitation und horizontale Bewegung.
     */
    throw() {
        this.speedY = 20;
        this.applyGravity();
        this.addInterval(() => {
            if (!this.isSplashing) this.x += this.speed * this.direction;
        }, 1000 / 60);
    }

    /**
     * Startet die Rotations- bzw. Zerplatz-Animation.
     */
    animate() {
        this.addInterval(() => {
            if (this.isSplashing) this.playAnimation(this.IMAGES_SPLASH, false);
            else this.playAnimation(this.IMAGES_ROTATION);
        }, 70);
    }

    /**
     * Lässt die Flasche zerplatzen und entfernt sie nach der Animation.
     */
    splash() {
        if (this.isSplashing) return;
        this.isSplashing = true;
        this.speedY = 0;
        this.acceleration = 0;
        this.x -= 10;
        this.width = 79;
        soundManager.play("splash");
        setTimeout(() => this.remove(), 450);
    }
}

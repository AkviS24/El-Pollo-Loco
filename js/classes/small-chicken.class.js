/**
 * Kleines Küken – schneller als ein normales Huhn und hüpft ab und zu.
 *
 * @extends Enemy
 */
class SmallChicken extends Enemy {

    /**
     * Breite des Kükens
     * @type {number}
     */
    width = 50;

    /**
     * Höhe des Kükens
     * @type {number}
     */
    height = 45;

    /**
     * Y-Position des Kükens (steht auf dem Boden)
     * @type {number}
     */
    y = 385;

    /**
     * Y-Position, auf der das Küken nach einem Hüpfer landet
     * @type {number}
     */
    groundY = 385;

    /**
     * Schaden bei Berührung
     * @type {number}
     */
    damage = 10;

    /**
     * Name des Sounds, der beim Tod abgespielt wird
     * @type {string}
     */
    deathSound = "chickDead";

    /**
     * Bilder für die Laufanimation
     * @type {string[]}
     */
    IMAGES_WALKING = [
        "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png"
    ];

    /**
     * Bild des besiegten Kükens
     * @type {string}
     */
    IMAGE_DEAD = "./img/3_enemies_chicken/chicken_small/2_dead/dead.png";

    /**
     * Kollisions-Offset des Kükens.
     * @type {{top:number, bottom:number, left:number, right:number}}
     */
    offset = { top: 4, bottom: 2, left: 4, right: 4 };

    /**
     * Erstellt ein neues Küken mit zufälliger Geschwindigkeit.
     *
     * @param {number} x - Start-X-Position im Level
     */
    constructor(x) {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages([...this.IMAGES_WALKING, this.IMAGE_DEAD]);
        this.x = x;
        this.speed = 0.5 + Math.random() * 0.5;
        this.applyGravity();
        this.animate();
    }

    /**
     * Startet Bewegung und Animation und lässt das Küken zufällig hüpfen.
     */
    animate() {
        super.animate();
        this.addInterval(() => this.hopRandomly(), 1200);
    }

    /** Lässt das Küken mit einer gewissen Wahrscheinlichkeit hüpfen. */
    hopRandomly() {
        if (!this.isDead() && !this.isAboveGround() && Math.random() < 0.4) {
            this.jump(15);
        }
    }
}

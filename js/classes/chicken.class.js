/**
 * Normales Huhn – läuft langsam nach links.
 *
 * @extends Enemy
 */
class Chicken extends Enemy {

    /**
     * Breite des Huhns
     * @type {number}
     */
    width = 65;

    /**
     * Höhe des Huhns
     * @type {number}
     */
    height = 63;

    /**
     * Y-Position des Huhns (steht auf dem Boden)
     * @type {number}
     */
    y = 367;

    /**
     * Bilder für die Laufanimation
     * @type {string[]}
     */
    IMAGES_WALKING = [
        "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
    ];

    /**
     * Bild des besiegten Huhns
     * @type {string}
     */
    IMAGE_DEAD = "./img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

    /**
     * Kollisions-Offset des Huhns.
     * @type {{top:number, bottom:number, left:number, right:number}}
     */
    offset = { top: 6, bottom: 4, left: 4, right: 4 };

    /**
     * Erstellt ein neues Huhn mit zufälliger Geschwindigkeit.
     *
     * @param {number} x - Start-X-Position im Level
     */
    constructor(x) {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages([...this.IMAGES_WALKING, this.IMAGE_DEAD]);
        this.x = x;
        this.speed = 0.25 + Math.random() * 0.35;
        this.animate();
    }
}

/**
 * Repräsentiert einen normalen Hühner-Gegner im Spiel.
 * Das Huhn läuft automatisch nach links und spielt eine Laufanimation.
 * 
 * @extends Character
 */
class Chicken extends Character {

    /** @type {number} Y-Position des Huhns im Spiel */
    y = 370;

    /** 
     * Bilder für die Laufanimation des Huhns
     * @type {string[]}
     */
    IMAGES_WALKING = [
        "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
    ];

    /**
     * Kollisions-Offset des Huhns.
     * Wird verwendet, um die Trefferbox anzupassen.
     * 
     * @type {{top:number, bottom:number, left:number, right:number}}
     */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    /**
     * Erstellt ein neues Chicken-Enemy.
     * Setzt Position, Größe, zufällige Geschwindigkeit
     * und lädt die Animationen.
     */
    constructor() {
        super();
        this.loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.height = 60;
        this.width = 60;

        /** Zufällige Startposition im Level */
        this.x = 1800 + Math.random() * 500;

        /** Zufällige Geschwindigkeit zwischen 0.15 und 0.4 */
        this.speed = 0.15 + Math.random() * 0.25;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    };

    /**
     * Startet Bewegung und Animation des Huhns.
     * Das Huhn bewegt sich kontinuierlich nach links
     * und spielt eine Laufanimation.
     */
    animate() {
        
        // Bewegung des Gegners
        this.moveInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        // Animation des Gegners
        this.animInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
        if (this.world && this.world.intervals) {
            this.world.intervals.push(this.moveInterval, this.animInterval);
        }
    }; 
}
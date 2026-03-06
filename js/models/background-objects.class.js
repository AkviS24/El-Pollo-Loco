/**
 * Repräsentiert ein Hintergrundobjekt im Spiel.
 * Wird verwendet, um scrollende Hintergrundbilder darzustellen.
 * @extends MovableObject
 */
class BackgroundObjects extends MovableObject {

    /** @type {number} Breite des Hintergrundobjekts */
    width = 720;

    /** @type {number} Höhe des Hintergrundobjekts */
    height = 480;

    /**
     * Erstellt ein neues Hintergrundobjekt.
     * 
     * @param {string} imagePath - Pfad zum Hintergrundbild
     * @param {number} x - X-Position des Objekts in der Welt
     */
    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}
/**
 * Repräsentiert eine Wolke im Hintergrund des Spiels.
 * Wolken bewegen sich langsam nach links, um einen Parallax-Effekt zu erzeugen.
 * 
 * @extends MovableObject
 */
class Cloud extends MovableObject {

    /** @type {number} Y-Position der Wolke im Hintergrund */
    y = 20;

    /** @type {number} Breite der Wolke */
    width = 500;

    /** @type {number} Höhe der Wolke */
    height = 250;

    /**
     * Erstellt eine neue Wolke.
     * Lädt das Wolkenbild, setzt eine zufällige X-Position
     * und startet die Animation.
     */
    constructor() {
        super();
        this.loadImage("./img/5_background/layers/4_clouds/1.png");

        /** Zufällige Startposition der Wolke */
        this.x = Math.random() * 500;

        this.animate();
    }

    /**
     * Startet die Bewegung der Wolke.
     * Die Wolke bewegt sich kontinuierlich nach links.
     */
    animate() {
        this.moveLeft();
    }
}
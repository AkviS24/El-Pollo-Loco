/**
 * Repräsentiert ein werfbares Objekt im Spiel (z.B. eine Flasche).
 * Erweitert MovableObject um Flug- und Rotationsanimation.
 * 
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {

    /**
     * Offset für Kollisionserkennung
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    /**
     * Array von Bildpfaden für die Rotationsanimation
     * @type {string[]}
     */
    IMAGES_ROTATION = [
        "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
    ];

    /**
     * Erstellt ein neues werfbares Objekt an der angegebenen Position.
     * Lädt Bilder, startet die Flugbewegung und die Rotationsanimation.
     * 
     * @param {number} x - Start-X-Position
     * @param {number} y - Start-Y-Position
     */
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 60;
        this.loadImage("./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
        this.loadImages(this.IMAGES_ROTATION);
        this.throw();
        this.animate();
    }

    /**
     * Startet den Wurf des Objekts.
     * Setzt vertikale und horizontale Geschwindigkeit und wendet Gravitation an.
     * Fügt das Intervall der Welt-Intervalle hinzu.
     */
    throw() {
        this.speedY = 30;
        this.speed = 10;
        this.applyGravity();
        let flightId = setInterval(() => {
            this.x += 10;
        }, 25);
        if (this.world && this.world.intervals) {
            this.world.intervals.push(flightId);
        }
    }

    /**
     * Startet die Rotationsanimation des Objekts.
     * Aktualisiert das Bild alle 100 ms.
     * Fügt das Intervall der Welt-Intervalle hinzu.
     */
    animate() {
        let animId = setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION);
        }, 100);
        if (this.world && this.world.intervals) {
            this.world.intervals.push(animId);
        }
    }
}
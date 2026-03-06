/**
 * Repräsentiert ein bewegliches Objekt im Spiel.
 * Erweitert DrawableObject um Bewegung, Gravitation, Kollision und Lebenszustand.
 * 
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {

    /** @type {number} Geschwindigkeit in horizontaler Richtung */
    speed = 0.15;

    /** @type {boolean} TRUE, wenn das Objekt in die entgegengesetzte Richtung zeigt */
    otherDirection = false;

    /** @type {number} Geschwindigkeit in vertikaler Richtung */
    speedY = 0;

    /** @type {number} Beschleunigung nach unten (Gravitation) */
    acceleration = 2.5;

    /** @type {number} Lebensenergie des Objekts */
    energy = 100;

    /** @type {number} Zeitstempel des letzten Treffers in ms */
    lastHit = 0;

    /** @type {number} Interval-ID der Gravitation */
    gravityInterval;

    /**
     * Wendet Gravitation auf das Objekt an.
     * Bewegt das Objekt nach unten, solange es nicht auf dem Boden ist oder nach oben springt.
     */
    applyGravity() {
        let id = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);

        this.gravityInterval = id;

        if (this.world && this.world.intervals) {
            this.world.intervals.push(id);
        }
    }

    /**
     * Prüft, ob dieses Objekt mit einem anderen kollidiert.
     * 
     * @param {MovableObject} mo - Das andere bewegliche Objekt
     * @returns {boolean} TRUE, wenn eine Kollision stattfindet
     */
    isColliding(mo) {
        return this.x + this.offset.left + this.width - this.offset.right - this.offset.left > mo.x + mo.offset.left &&
            this.y + this.offset.top + this.height - this.offset.top - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.offset.left + mo.width - mo.offset.left - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.offset.top + mo.height - mo.offset.top - mo.offset.bottom;
    }

    /**
     * Reduziert die Energie des Objekts bei einem Treffer.
     * Setzt lastHit, wenn das Objekt noch Energie hat.
     */
    hit() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Prüft, ob das Objekt gerade verletzt wurde.
     * 
     * @returns {boolean} TRUE, wenn weniger als 1 Sekunde seit dem letzten Treffer vergangen ist
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Differenz in ms
        timePassed = timePassed / 1000; // Umrechnung auf Sekunden
        return timePassed < 1;
    }

    /**
     * Prüft, ob das Objekt keine Energie mehr hat.
     * 
     * @returns {boolean} TRUE, wenn die Energie 0 ist
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Prüft, ob das Objekt sich über dem Boden befindet.
     * ThrowableObjects fliegen immer über dem Boden.
     * 
     * @returns {boolean} TRUE, wenn das Objekt über dem Boden ist
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    /** Bewegt das Objekt nach rechts */
    moveRight() {
        this.x += this.speed;
    }

    /** Bewegt das Objekt nach links */
    moveLeft() {
        this.x -= this.speed;
    }

    /** Lässt, während das Objekt springt den, den Sprungsound abspielen und setzt die vertikale Geschwindigkeit */
    jump() {
        world.character.hops.play();
        this.speedY = 30;
    }

    /**
     * Spielt eine Animation ab, indem das nächste Bild aus einem Array gesetzt wird.
     * 
     * @param {string[]} images - Array von Bildpfaden
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; // Wenn am Ende des Arrays fängt er wieder von vorne an
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
};
/**
 * Repräsentiert ein bewegliches Objekt im Spiel.
 * Erweitert DrawableObject um Bewegung, Gravitation, Kollision und Lebenszustand.
 *
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {

    /**
     * Geschwindigkeit in horizontaler Richtung
     * @type {number}
     */
    speed = 0.15;

    /**
     * TRUE, wenn das Objekt in die entgegengesetzte Richtung (nach links) schaut
     * @type {boolean}
     */
    otherDirection = false;

    /**
     * Geschwindigkeit in vertikaler Richtung
     * @type {number}
     */
    speedY = 0;

    /**
     * Beschleunigung nach unten (Gravitation)
     * @type {number}
     */
    acceleration = 2.5;

    /**
     * Y-Position, auf der das Objekt am Boden steht
     * @type {number}
     */
    groundY = 180;

    /**
     * Lebensenergie des Objekts
     * @type {number}
     */
    energy = 100;

    /**
     * Zeitstempel des letzten Treffers in ms
     * @type {number}
     */
    lastHit = 0;

    /**
     * IDs aller Intervalle, die dieses Objekt gestartet hat
     * @type {number[]}
     */
    intervals = [];

    /**
     * Aktuell abgespielte Animation
     * @type {string[]|null}
     */
    currentAnimation = null;

    /**
     * TRUE, sobald das Objekt aus der Welt entfernt werden soll
     * @type {boolean}
     */
    removable = false;

    /**
     * Abstände der Hitbox zum Bildrand.
     * Wird verwendet, um präzisere Kollisionen zu berechnen.
     *
     * @type {{top:number, bottom:number, left:number, right:number}}
     */
    offset = { top: 0, bottom: 0, left: 0, right: 0 };

    /**
     * Startet ein pausierbares Intervall und merkt sich dessen ID.
     *
     * @param {Function} fn - Funktion, die wiederholt ausgeführt wird
     * @param {number} time - Abstand in Millisekunden
     */
    addInterval(fn, time) {
        this.intervals.push(setStoppableInterval(fn, time));
    }

    /** Stoppt alle Intervalle dieses Objekts. */
    stopIntervals() {
        this.intervals.forEach((id) => clearInterval(id));
        this.intervals = [];
    }

    /** Stoppt das Objekt und markiert es, damit die Welt es aus ihren Listen entfernt. */
    remove() {
        this.stopIntervals();
        this.removable = true;
    }

    /**
     * Wendet Gravitation auf das Objekt an.
     * Bewegt das Objekt nach unten, solange es in der Luft ist oder nach oben springt.
     */
    applyGravity() {
        this.addInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.landOnGround();
            }
        }, 1000 / 25);
    }

    /** Setzt das Objekt exakt auf den Boden und stoppt die Fallbewegung. */
    landOnGround() {
        this.y = this.groundY;
        this.speedY = 0;
    }

    /**
     * Prüft, ob sich das Objekt über dem Boden befindet.
     *
     * @returns {boolean} TRUE, wenn das Objekt in der Luft ist
     */
    isAboveGround() {
        return this.y < this.groundY;
    }

    /**
     * Prüft, ob sich die Hitboxen dieses und eines anderen Objekts überschneiden.
     *
     * @param {MovableObject} mo - Das andere bewegliche Objekt
     * @returns {boolean} TRUE, wenn eine Kollision stattfindet
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Reduziert die Energie des Objekts und merkt sich den Zeitpunkt des Treffers.
     *
     * @param {number} damage - Abgezogene Energie
     */
    hit(damage) {
        this.energy = Math.max(0, this.energy - damage);
        this.lastHit = Date.now();
    }

    /**
     * Prüft, ob das Objekt gerade verletzt wurde.
     *
     * @param {number} [duration=1000] - Dauer des Verletzt-Zustands in ms
     * @returns {boolean} TRUE, wenn der letzte Treffer kürzer als duration her ist
     */
    isHurt(duration = 1000) {
        return Date.now() - this.lastHit < duration;
    }

    /**
     * Prüft, ob das Objekt keine Energie mehr hat.
     *
     * @returns {boolean} TRUE, wenn die Energie 0 ist
     */
    isDead() {
        return this.energy <= 0;
    }

    /** Bewegt das Objekt nach rechts */
    moveRight() {
        this.x += this.speed;
    }

    /** Bewegt das Objekt nach links */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Lässt das Objekt springen, indem die vertikale Geschwindigkeit gesetzt wird.
     *
     * @param {number} [power=30] - Startgeschwindigkeit nach oben
     */
    jump(power = 30) {
        this.speedY = power;
    }

    /**
     * Spielt eine Animation ab, indem das nächste Bild aus einem Array gesetzt wird.
     * Beim Wechsel der Animation wird automatisch beim ersten Bild begonnen.
     *
     * @param {string[]} images - Array von Bildpfaden
     * @param {boolean} [loop=true] - FALSE: bleibt am Ende auf dem letzten Bild stehen
     */
    playAnimation(images, loop = true) {
        if (this.currentAnimation !== images) {
            this.currentAnimation = images;
            this.currentImage = 0;
        }
        let i = loop ? this.currentImage % images.length : Math.min(this.currentImage, images.length - 1);
        this.img = this.imageCache[images[i]];
        this.currentImage++;
    }
}

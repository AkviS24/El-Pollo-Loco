/**
 * Basisklasse für alle Gegner.
 * Gegner laufen nach links, verursachen bei Berührung Schaden
 * und können durch Draufspringen oder Flaschen besiegt werden.
 *
 * @extends MovableObject
 */
class Enemy extends MovableObject {

    /**
     * Referenz zur aktuellen Spielwelt
     * @type {World}
     */
    world;

    /**
     * Schaden, den der Gegner bei Berührung verursacht
     * @type {number}
     */
    damage = 20;

    /**
     * TRUE, wenn der Gegner durch Draufspringen besiegt werden kann
     * @type {boolean}
     */
    stompable = true;

    /**
     * Name des Sounds, der beim Tod abgespielt wird
     * @type {string}
     */
    deathSound = "chickenDead";

    /**
     * Bilder für die Laufanimation (wird von Unterklassen gesetzt)
     * @type {string[]}
     */
    IMAGES_WALKING = [];

    /**
     * Bild des besiegten Gegners (wird von Unterklassen gesetzt)
     * @type {string}
     */
    IMAGE_DEAD = "";

    /**
     * Startet Bewegung und Animation des Gegners.
     */
    animate() {
        this.addInterval(() => this.walk(), 1000 / 60);
        this.addInterval(() => this.updateAnimation(), 150);
    }

    /** Bewegt den Gegner nach links, solange er lebt. */
    walk() {
        if (!this.isDead()) this.moveLeft();
    }

    /** Zeigt die Laufanimation bzw. das Bild des besiegten Gegners. */
    updateAnimation() {
        if (this.isDead()) this.img = this.imageCache[this.IMAGE_DEAD];
        else this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * Besiegt den Gegner: zeigt das Todesbild, spielt den Sound ab
     * und entfernt den Gegner kurz danach aus dem Level.
     */
    die() {
        if (this.isDead()) return;
        this.energy = 0;
        this.img = this.imageCache[this.IMAGE_DEAD];
        soundManager.play(this.deathSound);
        setTimeout(() => this.remove(), 700);
    }

    /** Reaktion auf einen Flaschentreffer – normale Hühner sterben sofort. */
    takeBottleHit() {
        this.die();
    }
}

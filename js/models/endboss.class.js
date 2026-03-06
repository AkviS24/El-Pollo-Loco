/**
 * Repräsentiert den Endboss des Spiels, erweiterbar von MovableObject.
 * Der Endboss kann gehen, Treffer einstecken und einen Hit-Sound abspielen.
 * 
 * @extends MovableObject
 */
class Endboss extends MovableObject {

    /** @type {number} Höhe des Endbosses in Pixel */
    height = 400;

    /** @type {number} Breite des Endbosses in Pixel */
    width = 250;

    /** @type {number} Y-Position des Endbosses auf der Bühne */
    y = 60;

    /** @type {number} Aktuelle Energie des Endbosses (ein Hit = 2 Energieeinheiten) */
    energy = 40; // benötigt dreißig Treffer (2 Energie pro Hit)

    /** @type {string[]} Bilder für die Geh-Animation */
    IMAGES_WALKING = [
        "./img/4_enemie_boss_chicken/2_alert/G5.png",
        "./img/4_enemie_boss_chicken/2_alert/G6.png",
        "./img/4_enemie_boss_chicken/2_alert/G7.png",
        "./img/4_enemie_boss_chicken/2_alert/G8.png",
        "./img/4_enemie_boss_chicken/2_alert/G9.png",
        "./img/4_enemie_boss_chicken/2_alert/G10.png",
        "./img/4_enemie_boss_chicken/2_alert/G11.png",
        "./img/4_enemie_boss_chicken/2_alert/G12.png"
    ];

    /**
     * Offset für die Kollisionserkennung des Endbosses
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 50,
        bottom: 10,
        left: 30,
        right: 10
    };

    /**
     * Erstellt eine neue Instanz des Endbosses, lädt Bilder und startet die Animation.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGES_WALKING[0]);
        this.x = 1800;

        /** @type {HTMLAudioElement} Sound, der abgespielt wird, wenn der Boss getroffen wird */
        this.hitSound = new Audio("./audio/endboss/endbossApproach.wav");
        this.hitSound.volume = 0.5;
        this.animate();
    }
    
    /**
     * Behandelt einen Treffer auf den Endboss, reduziert Energie und spielt den Hit-Sound.
     */
    hit() {
        super.hit();
        this.hitSound.play();
    }

    /**
     * Startet die Geh-/Alert-Animation des Endbosses.
     * Die Animation wird alle 200 ms aktualisiert.
     * Fügt das Intervall der Welt-Intervalle-Liste hinzu, falls vorhanden.
     */
    animate() {
        this.animInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
        if (this.world && this.world.intervals) {
            this.world.intervals.push(this.animInterval);
        }
    };
}
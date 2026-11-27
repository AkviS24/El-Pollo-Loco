/**
 * Der Endboss – eine riesige, verrückte Henne.
 * Wartet am Ende des Levels, wird aufmerksam sobald Pepe näher kommt,
 * läuft dann auf ihn zu und greift an. Kann nur mit Flaschen besiegt werden.
 *
 * @extends Enemy
 */
class Endboss extends Enemy {

    /**
     * Höhe des Endbosses
     * @type {number}
     */
    height = 400;

    /**
     * Breite des Endbosses
     * @type {number}
     */
    width = 345;

    /**
     * Y-Position des Endbosses
     * @type {number}
     */
    y = 40;

    /**
     * Lebensenergie – jeder Flaschentreffer zieht 20 ab
     * @type {number}
     */
    energy = 100;

    /**
     * Schaden, den der Endboss bei Berührung verursacht
     * @type {number}
     */
    damage = 25;

    /**
     * Laufgeschwindigkeit
     * @type {number}
     */
    speed = 2.2;

    /**
     * Der Endboss kann nicht durch Draufspringen besiegt werden
     * @type {boolean}
     */
    stompable = false;

    /**
     * TRUE, sobald der Endboss Pepe entdeckt hat
     * @type {boolean}
     */
    activated = false;

    /**
     * Zeitpunkt der Aktivierung
     * @type {number}
     */
    activatedAt = 0;

    /**
     * Abstand, ab dem der Endboss Pepe bemerkt
     * @type {number}
     */
    activationDistance = 520;

    /**
     * Dauer der Alarm-Animation nach der Aktivierung in ms
     * @type {number}
     */
    alertDuration = 1200;

    /**
     * Abstand (Mitte zu Mitte), ab dem der Endboss angreift
     * @type {number}
     */
    attackDistance = 280;

    /**
     * Bilder für die Laufanimation
     * @type {string[]}
     */
    IMAGES_WALKING = [
        "./img/4_enemie_boss_chicken/1_walk/G1.png",
        "./img/4_enemie_boss_chicken/1_walk/G2.png",
        "./img/4_enemie_boss_chicken/1_walk/G3.png",
        "./img/4_enemie_boss_chicken/1_walk/G4.png"
    ];

    /**
     * Bilder für die Alarm-Animation
     * @type {string[]}
     */
    IMAGES_ALERT = [
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
     * Bilder für die Angriffsanimation
     * @type {string[]}
     */
    IMAGES_ATTACK = [
        "./img/4_enemie_boss_chicken/3_attack/G13.png",
        "./img/4_enemie_boss_chicken/3_attack/G14.png",
        "./img/4_enemie_boss_chicken/3_attack/G15.png",
        "./img/4_enemie_boss_chicken/3_attack/G16.png",
        "./img/4_enemie_boss_chicken/3_attack/G17.png",
        "./img/4_enemie_boss_chicken/3_attack/G18.png",
        "./img/4_enemie_boss_chicken/3_attack/G19.png",
        "./img/4_enemie_boss_chicken/3_attack/G20.png"
    ];

    /**
     * Bilder für die Verletzt-Animation
     * @type {string[]}
     */
    IMAGES_HURT = [
        "./img/4_enemie_boss_chicken/4_hurt/G21.png",
        "./img/4_enemie_boss_chicken/4_hurt/G22.png",
        "./img/4_enemie_boss_chicken/4_hurt/G23.png"
    ];

    /**
     * Bilder für die Todesanimation
     * @type {string[]}
     */
    IMAGES_DEAD = [
        "./img/4_enemie_boss_chicken/5_dead/G24.png",
        "./img/4_enemie_boss_chicken/5_dead/G25.png",
        "./img/4_enemie_boss_chicken/5_dead/G26.png"
    ];

    /**
     * Kollisions-Offset des Endbosses.
     * @type {{top:number, bottom:number, left:number, right:number}}
     */
    offset = { top: 80, bottom: 25, left: 45, right: 35 };

    /**
     * Erstellt den Endboss, lädt alle Animationen und startet sie.
     *
     * @param {number} x - X-Position im Level
     */
    constructor(x) {
        super();
        this.loadImage(this.IMAGES_ALERT[0]);
        [this.IMAGES_WALKING, this.IMAGES_ALERT, this.IMAGES_ATTACK,
        this.IMAGES_HURT, this.IMAGES_DEAD].forEach((images) => this.loadImages(images));
        this.x = x;
        this.animate();
    }

    /**
     * Startet Verhalten und Animation des Endbosses.
     */
    animate() {
        this.addInterval(() => this.updateBehaviour(), 1000 / 60);
        this.addInterval(() => this.updateAnimation(), 150);
    }

    /**
     * Entscheidet, ob der Endboss aktiviert wird und ob er sich auf Pepe zubewegt.
     */
    updateBehaviour() {
        if (!this.world || this.isDead()) return;
        if (!this.activated && this.isCharacterInRange()) this.activate();
        if (this.canMove()) this.moveTowardsCharacter();
    }

    /**
     * Prüft, ob Pepe nah genug ist, um den Endboss aufzuwecken.
     *
     * @returns {boolean} TRUE, wenn Pepe in Reichweite ist
     */
    isCharacterInRange() {
        return this.world.character.x > this.x - this.activationDistance;
    }

    /** Aktiviert den Endboss: Alarm-Animation, Sound und Anzeige der Lebensleiste. */
    activate() {
        this.activated = true;
        this.activatedAt = Date.now();
        soundManager.play("endbossAlert");
    }

    /**
     * Prüft, ob der Endboss gerade noch die Alarm-Animation zeigt.
     *
     * @returns {boolean} TRUE während der Alarmphase
     */
    isAlerting() {
        return Date.now() - this.activatedAt < this.alertDuration;
    }

    /**
     * Prüft, ob sich der Endboss bewegen darf.
     *
     * @returns {boolean} TRUE, wenn aktiviert, nicht im Alarm und nicht verletzt
     */
    canMove() {
        return this.activated && !this.isAlerting() && !this.isHurt();
    }

    /**
     * Berechnet den horizontalen Abstand (Mitte zu Mitte) zu Pepe.
     *
     * @returns {number} Vorzeichenbehafteter Abstand, positiv wenn Pepe rechts steht
     */
    distanceToCharacter() {
        let character = this.world.character;
        return (character.x + character.width / 2) - (this.x + this.width / 2);
    }

    /** Bewegt den Endboss in Richtung Pepe und dreht ihn passend. */
    moveTowardsCharacter() {
        let distance = this.distanceToCharacter();
        if (Math.abs(distance) < 30) return;
        this.otherDirection = distance > 0;
        this.otherDirection ? this.moveRight() : this.moveLeft();
    }

    /**
     * Prüft, ob Pepe nah genug für einen Angriff ist.
     *
     * @returns {boolean} TRUE, wenn Pepe in Angriffsreichweite ist
     */
    isAttacking() {
        return Math.abs(this.distanceToCharacter()) < this.attackDistance;
    }

    /**
     * Wählt anhand des aktuellen Zustands die passende Animation aus.
     */
    updateAnimation() {
        if (this.isDead()) this.playAnimation(this.IMAGES_DEAD, false);
        else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
        else if (!this.activated || this.isAlerting()) this.playAnimation(this.IMAGES_ALERT);
        else if (this.isAttacking()) this.playAnimation(this.IMAGES_ATTACK);
        else this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * Reaktion auf einen Flaschentreffer: zieht Energie ab und aktiviert den Endboss.
     */
    takeBottleHit() {
        if (this.isDead()) return;
        this.hit(20);
        if (!this.activated) this.activate();
        soundManager.play(this.isDead() ? "chickenDead" : "endbossHurt");
    }
}

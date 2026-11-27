/**
 * Hauptcharakter des Spiels (Pepe).
 * Pepe kann laufen, springen, Flaschen werfen, Schaden nehmen und sterben.
 * Steht er länger still, wechselt er von der Idle- in die Schlaf-Animation.
 *
 * @extends MovableObject
 */
class Character extends MovableObject {

    /**
     * Höhe des Charakters
     * @type {number}
     */
    height = 250;

    /**
     * Breite des Charakters
     * @type {number}
     */
    width = 125;

    /**
     * Y-Position des Charakters
     * @type {number}
     */
    y = 180;

    /**
     * Y-Position, auf der Pepe am Boden steht
     * @type {number}
     */
    groundY = 180;

    /**
     * Referenz zur aktuellen Spielwelt
     * @type {World}
     */
    world;

    /**
     * Bewegungsgeschwindigkeit
     * @type {number}
     */
    speed = 6;

    /**
     * Anzahl gesammelter Münzen
     * @type {number}
     */
    coins = 0;

    /**
     * Anzahl verfügbarer Flaschen
     * @type {number}
     */
    bottles = 0;

    /**
     * Zeitpunkt der letzten Spieleraktion (für die Schlaf-Animation)
     * @type {number}
     */
    lastActionTime = Date.now();

    /**
     * Zeitpunkt des letzten Wurfs
     * @type {number}
     */
    lastThrowTime = 0;

    /**
     * Millisekunden ohne Aktion, bis Pepe einschläft
     * @type {number}
     */
    sleepDelay = 8000;

    /**
     * Minimale Zeit zwischen zwei Würfen in ms
     * @type {number}
     */
    throwCooldown = 600;

    /**
     * Hilfsflag, um die Idle-Animation langsamer abzuspielen
     * @type {boolean}
     */
    skipIdleFrame = false;

    /**
     * Bilder für die Idle-Animation
     * @type {string[]}
     */
    IMAGES_IDLE = [
        "./img/2_character_pepe/1_idle/idle/I-1.png",
        "./img/2_character_pepe/1_idle/idle/I-2.png",
        "./img/2_character_pepe/1_idle/idle/I-3.png",
        "./img/2_character_pepe/1_idle/idle/I-4.png",
        "./img/2_character_pepe/1_idle/idle/I-5.png",
        "./img/2_character_pepe/1_idle/idle/I-6.png",
        "./img/2_character_pepe/1_idle/idle/I-7.png",
        "./img/2_character_pepe/1_idle/idle/I-8.png",
        "./img/2_character_pepe/1_idle/idle/I-9.png",
        "./img/2_character_pepe/1_idle/idle/I-10.png"
    ];

    /**
     * Bilder für die Schlaf-Animation (Long Idle)
     * @type {string[]}
     */
    IMAGES_LONG_IDLE = [
        "./img/2_character_pepe/1_idle/long_idle/I-11.png",
        "./img/2_character_pepe/1_idle/long_idle/I-12.png",
        "./img/2_character_pepe/1_idle/long_idle/I-13.png",
        "./img/2_character_pepe/1_idle/long_idle/I-14.png",
        "./img/2_character_pepe/1_idle/long_idle/I-15.png",
        "./img/2_character_pepe/1_idle/long_idle/I-16.png",
        "./img/2_character_pepe/1_idle/long_idle/I-17.png",
        "./img/2_character_pepe/1_idle/long_idle/I-18.png",
        "./img/2_character_pepe/1_idle/long_idle/I-19.png",
        "./img/2_character_pepe/1_idle/long_idle/I-20.png"
    ];

    /**
     * Bilder für die Laufanimation
     * @type {string[]}
     */
    IMAGES_WALKING = [
        "./img/2_character_pepe/2_walk/W-21.png",
        "./img/2_character_pepe/2_walk/W-22.png",
        "./img/2_character_pepe/2_walk/W-23.png",
        "./img/2_character_pepe/2_walk/W-24.png",
        "./img/2_character_pepe/2_walk/W-25.png",
        "./img/2_character_pepe/2_walk/W-26.png"
    ];

    /**
     * Bilder für die Sprunganimation
     * @type {string[]}
     */
    IMAGES_JUMPING = [
        "./img/2_character_pepe/3_jump/J-31.png",
        "./img/2_character_pepe/3_jump/J-32.png",
        "./img/2_character_pepe/3_jump/J-33.png",
        "./img/2_character_pepe/3_jump/J-34.png",
        "./img/2_character_pepe/3_jump/J-35.png",
        "./img/2_character_pepe/3_jump/J-36.png",
        "./img/2_character_pepe/3_jump/J-37.png",
        "./img/2_character_pepe/3_jump/J-38.png",
        "./img/2_character_pepe/3_jump/J-39.png"
    ];

    /**
     * Bilder für die Schaden-Animation
     * @type {string[]}
     */
    IMAGES_HURT = [
        "./img/2_character_pepe/4_hurt/H-41.png",
        "./img/2_character_pepe/4_hurt/H-42.png",
        "./img/2_character_pepe/4_hurt/H-43.png"
    ];

    /**
     * Bilder für die Todesanimation
     * @type {string[]}
     */
    IMAGES_DEAD = [
        "./img/2_character_pepe/5_dead/D-51.png",
        "./img/2_character_pepe/5_dead/D-52.png",
        "./img/2_character_pepe/5_dead/D-53.png",
        "./img/2_character_pepe/5_dead/D-54.png",
        "./img/2_character_pepe/5_dead/D-55.png",
        "./img/2_character_pepe/5_dead/D-56.png",
        "./img/2_character_pepe/5_dead/D-57.png"
    ];

    /**
     * Kollisions-Offset des Charakters.
     * @type {{top:number, bottom:number, left:number, right:number}}
     */
    offset = { top: 100, bottom: 10, left: 25, right: 30 };

    /**
     * Erstellt einen neuen Character.
     * Lädt alle Animationen, aktiviert die Gravitation und startet die Animationen.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_IDLE[0]);
        [this.IMAGES_IDLE, this.IMAGES_LONG_IDLE, this.IMAGES_WALKING,
        this.IMAGES_JUMPING, this.IMAGES_HURT, this.IMAGES_DEAD].forEach((images) => this.loadImages(images));
        this.applyGravity();
        this.animate();
    }

    /**
     * Startet die Bewegungs- und Animationsintervalle des Charakters.
     */
    animate() {
        this.addInterval(() => this.update(), 1000 / 60);
        this.addInterval(() => this.updateAnimation(), 110);
    }

    /**
     * Aktualisiert Pepe in jedem Spiel-Tick: Bewegung, Sounds und Kamera.
     * Nach dem Tod kann Pepe nicht mehr gesteuert werden.
     */
    update() {
        if (!this.world) return;
        if (!this.isDead()) this.moveCharacter();
        this.updateWalkSound();
        this.updateSnoreSound();
        this.updateCamera();
    }

    /**
     * Bewegt Pepe anhand der Tastatureingaben.
     */
    moveCharacter() {
        if (this.canMoveRight()) this.walk(false);
        if (this.canMoveLeft()) this.walk(true);
        if (this.canJump()) this.jump();
        if (this.world.keyboard.isAnyKeyPressed()) this.wakeUp();
    }

    /** Lässt die Kamera Pepe folgen, indem die Welt verschoben wird. */
    updateCamera() {
        this.world.cameraX = -this.x + 100;
    }

    /**
     * Bewegt Pepe einen Schritt in die angegebene Richtung.
     *
     * @param {boolean} toLeft - TRUE für links, FALSE für rechts
     */
    walk(toLeft) {
        toLeft ? this.moveLeft() : this.moveRight();
        this.otherDirection = toLeft;
    }

    /**
     * Prüft, ob der Charakter nach rechts laufen darf.
     *
     * @returns {boolean} TRUE, wenn Bewegung nach rechts möglich ist
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX;
    }

    /**
     * Prüft, ob der Charakter nach links laufen darf.
     *
     * @returns {boolean} TRUE, wenn Bewegung nach links möglich ist
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
     * Prüft, ob der Charakter springen darf (nur vom Boden aus).
     *
     * @returns {boolean} TRUE, wenn ein Sprung möglich ist
     */
    canJump() {
        return (this.world.keyboard.SPACE || this.world.keyboard.UP) && !this.isAboveGround();
    }

    /**
     * Lässt Pepe springen und spielt den Sprungsound ab.
     *
     * @param {number} [power=30] - Startgeschwindigkeit nach oben
     */
    jump(power = 30) {
        super.jump(power);
        soundManager.play("jump");
    }

    /** Lässt Pepe nach dem Draufspringen auf einen Gegner leicht abprallen. */
    bounce() {
        super.jump(18);
    }

    /**
     * Prüft, ob Pepe gerade am Boden läuft.
     *
     * @returns {boolean} TRUE, wenn eine Laufrichtung gedrückt ist, Pepe am Boden steht und lebt
     */
    isWalking() {
        let walkKeyPressed = this.world.keyboard.LEFT || this.world.keyboard.RIGHT;
        return walkKeyPressed && !this.isAboveGround() && !this.isDead();
    }

    /** Spielt den Laufsound nur ab, solange Pepe tatsächlich läuft. */
    updateWalkSound() {
        if (this.isWalking()) soundManager.playLoop("walk");
        else soundManager.pause("walk");
    }

    /**
     * Wählt anhand des aktuellen Zustands die passende Animation aus.
     */
    updateAnimation() {
        if (!this.world) return;
        if (this.isDead()) this.playAnimation(this.IMAGES_DEAD, false);
        else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
        else if (this.isAboveGround()) this.playAnimation(this.IMAGES_JUMPING, false);
        else if (this.isWalking()) this.playAnimation(this.IMAGES_WALKING);
        else this.playIdleAnimation();
    }

    /**
     * Spielt die Idle- bzw. nach längerer Inaktivität die Schlaf-Animation ab.
     * Es wird nur jedes zweite Intervall ein neues Bild gesetzt, damit die Animation ruhiger wirkt.
     */
    playIdleAnimation() {
        let images = this.isSleeping() ? this.IMAGES_LONG_IDLE : this.IMAGES_IDLE;
        this.skipIdleFrame = !this.skipIdleFrame;
        if (this.skipIdleFrame && this.currentAnimation === images) return;
        this.playAnimation(images);
    }

    /**
     * Prüft, ob Pepe eingeschlafen ist.
     *
     * @returns {boolean} TRUE, wenn länger als sleepDelay keine Aktion stattfand
     */
    isSleeping() {
        return Date.now() - this.lastActionTime > this.sleepDelay;
    }

    /** Merkt sich die aktuelle Zeit als letzte Aktion, Pepe wacht dadurch auf. */
    wakeUp() {
        this.lastActionTime = Date.now();
    }

    /** Spielt das Schnarchen nur ab, solange Pepe schläft. */
    updateSnoreSound() {
        if (this.isSleeping() && !this.isDead()) soundManager.playLoop("snore");
        else soundManager.pause("snore");
    }

    /**
     * Verarbeitet Schaden am Charakter. Nach einem Treffer ist Pepe kurz unverwundbar.
     *
     * @param {number} damage - Abgezogene Energie
     */
    hit(damage) {
        if (this.isHurt() || this.isDead()) return;
        super.hit(damage);
        this.wakeUp();
        soundManager.play(this.isDead() ? "dead" : "hurt");
    }

    /**
     * Prüft, ob Pepe wieder eine Flasche werfen darf.
     *
     * @returns {boolean} TRUE, wenn Pepe lebt und die Wurfpause vorbei ist
     */
    canThrow() {
        return !this.isDead() && Date.now() - this.lastThrowTime > this.throwCooldown;
    }
}

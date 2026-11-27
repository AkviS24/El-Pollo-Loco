/**
 * Einstellungen eines einzelnen Sounds.
 * @typedef {Object} SoundConfig
 * @property {string} src - Pfad zur Audiodatei
 * @property {number} volume - Lautstärke von 0 bis 1
 * @property {boolean} [loop] - TRUE, wenn der Sound in Schleife läuft
 */

/**
 * Verwaltet alle Sounds und die Hintergrundmusik an einer zentralen Stelle.
 * Dadurch wirkt das Stummschalten auf wirklich jeden Sound im Spiel.
 * Der Stumm-Zustand wird im localStorage gespeichert und beim nächsten Besuch wiederhergestellt.
 */
class SoundManager {

    /**
     * Alle Sounds des Spiels mit Pfad, Lautstärke und ob sie in Schleife laufen.
     * @type {Object.<string, SoundConfig>}
     */
    soundFiles = {
        music: { src: "./audio/game/backgroundMusic.mp3", volume: 0.18, loop: true },
        gameStart: { src: "./audio/game/gameStart.mp3", volume: 0.7 },
        win: { src: "./audio/game/win.mp3", volume: 0.45 },
        lose: { src: "./audio/game/lose.mp3", volume: 0.3 },
        walk: { src: "./audio/character/characterRun.mp3", volume: 0.3, loop: true },
        jump: { src: "./audio/character/characterJump.mp3", volume: 0.35 },
        hurt: { src: "./audio/character/characterDamage.mp3", volume: 0.4 },
        dead: { src: "./audio/character/characterDead.mp3", volume: 0.35 },
        snore: { src: "./audio/character/characterSnoring.mp3", volume: 0.6, loop: true },
        splash: { src: "./audio/throwable/bottleBreak.mp3", volume: 0.35 },
        empty: { src: "./audio/throwable/pups.mp3", volume: 0.5 },
        coin: { src: "./audio/collectibles/collectSound.mp3", volume: 0.35 },
        bottle: { src: "./audio/collectibles/bottleCollectSound.mp3", volume: 0.5 },
        chickenDead: { src: "./audio/chicken/chickenDead.mp3", volume: 0.6 },
        chickDead: { src: "./audio/chicken/chickenDead2.mp3", volume: 0.6 },
        endbossAlert: { src: "./audio/endboss/endbossApproach.mp3", volume: 0.8 },
        endbossHurt: { src: "./audio/endboss/endbossApproach.mp3", volume: 0.8 }
    };

    /**
     * Schlüssel für den Stumm-Zustand im localStorage
     * @type {string}
     */
    storageKey = "elPolloLoco.muted";

    /**
     * Alle erzeugten Audio-Elemente nach Namen
     * @type {Object.<string, HTMLAudioElement>}
     */
    sounds = {};

    /**
     * TRUE, wenn alle Sounds stumm geschaltet sind
     * @type {boolean}
     */
    muted = false;

    /**
     * Lädt den gespeicherten Stumm-Zustand und erzeugt alle Audio-Elemente.
     */
    constructor() {
        this.muted = this.loadMuteState();
        Object.entries(this.soundFiles).forEach(([name, config]) => this.createSound(name, config));
    }

    /**
     * Erzeugt ein Audio-Element und übernimmt Lautstärke, Loop und Stumm-Zustand.
     *
     * @param {string} name - Name, unter dem der Sound abgespielt wird
     * @param {SoundConfig} config - Einstellungen des Sounds
     */
    createSound(name, config) {
        let audio = new Audio(config.src);
        audio.volume = config.volume;
        audio.loop = config.loop || false;
        audio.muted = this.muted;
        this.sounds[name] = audio;
    }

    /**
     * Spielt einen Sound von vorne ab.
     *
     * @param {string} name - Name des Sounds
     */
    play(name) {
        let sound = this.sounds[name];
        sound.currentTime = 0;
        sound.play().catch(() => { });
    }

    /**
     * Spielt einen Loop-Sound ab bzw. setzt ihn fort, falls er pausiert ist.
     *
     * @param {string} name - Name des Sounds
     */
    playLoop(name) {
        let sound = this.sounds[name];
        if (sound.paused) sound.play().catch(() => { });
    }

    /**
     * Pausiert einen Sound, ohne ihn zurückzuspulen.
     *
     * @param {string} name - Name des Sounds
     */
    pause(name) {
        let sound = this.sounds[name];
        if (!sound.paused) sound.pause();
    }

    /** Pausiert alle Loop-Sounds (Musik, Laufen, Schnarchen), z.B. beim Pausieren des Spiels. */
    pauseLoops() {
        Object.entries(this.soundFiles).forEach(([name, config]) => {
            if (config.loop) this.pause(name);
        });
    }

    /** Stoppt alle Sounds und spult sie an den Anfang zurück. */
    stopAll() {
        Object.values(this.sounds).forEach((sound) => {
            sound.pause();
            sound.currentTime = 0;
        });
    }

    /** Schaltet alle Sounds stumm bzw. wieder an und speichert die Einstellung. */
    toggleMute() {
        this.muted = !this.muted;
        Object.values(this.sounds).forEach((sound) => sound.muted = this.muted);
        this.saveMuteState();
    }

    /**
     * Liest den gespeicherten Stumm-Zustand aus dem localStorage.
     *
     * @returns {boolean} TRUE, wenn der Ton zuletzt ausgeschaltet war
     */
    loadMuteState() {
        try {
            return localStorage.getItem(this.storageKey) === "true";
        } catch (error) {
            return false;
        }
    }

    /** Speichert den aktuellen Stumm-Zustand im localStorage. */
    saveMuteState() {
        try {
            localStorage.setItem(this.storageKey, String(this.muted));
        } catch (error) {
            return;
        }
    }
}

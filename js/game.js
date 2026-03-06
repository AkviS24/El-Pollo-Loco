/**
 * @fileoverview Hauptskript für das Spiel, inklusive Initialisierung, Steuerung, Sound und UI.
 */

/** @type {HTMLCanvasElement} Canvas-Element für das Spiel */
let canvas;

/** @type {HTMLElement} Container, der das Spiel enthält */
let gameContainer = document.getElementById("game-container");

/** @type {World} Aktuelle Spielwelt */
let world;

/** @type {Keyboard} Tastatursteuerung */
let keyboard = new Keyboard();

/** @type {Audio[]} Array aller Sounds im Spiel */
let sounds = [];

/** @type {number} Lautstärke-Masterwert für alle Sounds (0.0 - 1.0) */
let masterVolume = 0.2;

/**
 * Fügt alle wichtigen Sounds der Spielwelt zum Sounds-Array hinzu und setzt die Lautstärke.
 */
function soundPushing() {
    sounds.push(world.gamestartSound);
    sounds.push(world.character.pups);
    sounds.push(world.character.throwing);
    sounds.push(world.character.damage);
    sounds.push(world.character.dead);
    sounds.push(world.character.hops);
    sounds.push(world.character.pups);
    sounds.push(world.character.move);
    sounds.push(world.character.collectSound);
    sounds.forEach((element) => element.volume = masterVolume);
}

/**
 * Initialisiert das Spiel: Canvas, Welt, Level und Sounds.
 */
function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    world.level = createLevel1();
    world.gamestartSound.play();
    soundPushing();
}

/**
 * Aktiviert die mobilen Steuerungselemente, falls der Nutzer ein Touch-Gerät benutzt.
 */
if (window.matchMedia("(pointer: coarse)").matches) {
    document.getElementById("mobile-controls").classList.remove("mobile-controls");
    document.getElementById("mobile-controls").classList.add("mobile-controls-visible");
}

/**
 * Schaltet alle Sounds stumm oder wieder an.
 */
function mute() {
    if (sounds[0].muted) {
        sounds.forEach((s) => s.muted = false);
    } else {
        sounds.forEach((s) => s.muted = true);
    }
}

/**
 * Aktiviert den Vollbildmodus für das Spiel oder verlässt ihn.
 */
function fullscreen() {
    if (!document.fullscreenElement) {
        gameContainer.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

/**
 * Startet ein neues Spiel, blendet den Gewinnbildschirm aus und initialisiert die Welt neu.
 */
function newstartGame() {
    document.getElementById("winner-info").classList.add("winner-info");
    document.getElementById("winner-info").classList.remove("winner-info-visible");
    document.getElementById("win-screen").classList.add("win-screen");
    document.getElementById("win-screen").classList.remove("win-screen-visible");
    restartGame();
}

/**
 * Zeigt die Gewinnerinformationen nach einem Sieg an.
 */
function winnerInfo() {
    document.getElementById("winner-info").classList.add("winner-info-visible");
    document.getElementById("winner-info").classList.remove("winner-info");
}

/**
 * Zeigt den Gewinnbildschirm an und startet nach 5 Sekunden die Gewinnerinfo.
 */
function win() {
    document.getElementById("win-screen").classList.add("win-screen-visible");
    document.getElementById("win-screen").classList.remove("win-screen");
    setTimeout(winnerInfo, 5000);
}

/**
 * Erstellt das Level 1 mit Gegnern, Wolken und Hintergrundobjekten.
 * @returns {Level} Neues Level-Objekt
 */
function createLevel1() {
    return new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss()
        ],
        [
            new Cloud(),
        ],
        [
            new BackgroundObjects("./img/5_background/layers/air.png", -720),
            new BackgroundObjects("./img/5_background/layers/3_third_layer/2.png", -720),
            new BackgroundObjects("./img/5_background/layers/2_second_layer/2.png", -720),
            new BackgroundObjects("./img/5_background/layers/1_first_layer/2.png", -720),

            new BackgroundObjects("./img/5_background/layers/air.png", 0),
            new BackgroundObjects("./img/5_background/layers/3_third_layer/1.png", 0),
            new BackgroundObjects("./img/5_background/layers/2_second_layer/1.png", 0),
            new BackgroundObjects("./img/5_background/layers/1_first_layer/1.png", 0),

            new BackgroundObjects("./img/5_background/layers/air.png", 719),
            new BackgroundObjects("./img/5_background/layers/3_third_layer/2.png", 719),
            new BackgroundObjects("./img/5_background/layers/2_second_layer/2.png", 719),
            new BackgroundObjects("./img/5_background/layers/1_first_layer/2.png", 719),

            new BackgroundObjects("./img/5_background/layers/air.png", 719 * 2),
            new BackgroundObjects("./img/5_background/layers/3_third_layer/1.png", 719 * 2),
            new BackgroundObjects("./img/5_background/layers/2_second_layer/1.png", 719 * 2),
            new BackgroundObjects("./img/5_background/layers/1_first_layer/1.png", 719 * 2)
        ]
    );
}

/**
 * Startet das Spiel neu: stoppt die alte Welt, leert Sounds und erstellt das Level neu.
 */
function restartGame() {
    stopGame();
    sounds = [];
    world = null;
    level1 = createLevel1();
    document.getElementById("death-screen").classList.remove("death-screen-visible");
    document.getElementById("death-screen").classList.add("death-screen");
    init();
}

/**
 * Zeigt den Tod-Bildschirm an.
 */
function deathScreen() {
    document.getElementById("death-screen").classList.add("death-screen-visible");
    document.getElementById("death-screen").classList.remove("death-screen");
}

/**
 * Zeigt das Hilfe-Menü an und pausiert das Spiel.
 */
function help() {
    document.getElementById("help-menu").classList.add("help-menu-visible");
    document.getElementById("help-menu").classList.remove("help-menu");
    pauseGame();
}

/**
 * Schließt das Hilfe-Menü und setzt das Spiel fort.
 */
function backToGame() {
    document.getElementById("help-menu").classList.remove("help-menu-visible");
    document.getElementById("help-menu").classList.add("help-menu");
    resumeGame();
}

/**
 * Stoppt das Spiel: Animationsframes abbrechen und alle Intervalle löschen.
 */
function stopGame() {
    cancelAnimationFrame(world.animationFrame);
    world.intervals.forEach(element => {
        clearInterval(element);
    });
}

/**
 * Pausiert das Spiel, indem alle Intervalle gestoppt werden.
 */
function pauseGame() {
    world.intervals.forEach(element => {
        clearInterval(element);
    });
    world.paused = true;
}

/**
 * Setzt das Spiel fort nach einer Pause, startet Animationen und Intervalle neu.
 */
function resumeGame() {
    if (!world.paused) return; // already running

    // reset the tracking array so we don't duplicate IDs
    world.intervals = [];

    // restart recurring logic
    world.run();
    world.character.animate();
    world.character.applyGravity();

    // make sure all existing enemies/objects animate again
    world.level.enemies.forEach(e => {
        if (typeof e.animate === 'function') e.animate();
    });
    world.throwableObjects.forEach(o => {
        if (typeof o.animate === 'function') o.animate();
    });
    world.coinAnimations.forEach(c => {
        if (typeof c.animate === 'function') c.animate();
    });

    world.paused = false;
}

/**
 * Event-Listener für Tastendrücke, setzt die entsprechenden Keyboard-Flags.
 */
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 65 || e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 68 || e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 87 || e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 83 || e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 70) {
        keyboard.F = true;
    }
    if (e.keyCode == 86) {
        keyboard.V = true;
    }
});

/**
 * Event-Listener für Tastenloslassen, setzt die Keyboard-Flags zurück.
 */
window.addEventListener("keyup", (e) => {
    if (e.keyCode == 65 || e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 68 || e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 87 || e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 83 || e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 70) {
        keyboard.F = false;
    }
    if (e.keyCode == 86) {
        keyboard.V = false;
    }
});

/**
 * Touch-Event-Listener für mobile Steuerung: setzen der Keyboard-Flags bei Berührung.
 */
document.getElementById("leftBTN").addEventListener("touchstart", () => {
    keyboard.LEFT = true;
});

document.getElementById("rightBTN").addEventListener("touchstart", () => {
    keyboard.RIGHT = true;
});

document.getElementById("buyBTN").addEventListener("touchstart", () => {
    keyboard.V = true;
});

document.getElementById("attackBTN").addEventListener("touchstart", () => {
    keyboard.F = true;
});

document.getElementById("jumpBTN").addEventListener("touchstart", () => {
    keyboard.SPACE = true;
});

/**
 * Touch-Event-Listener für mobile Steuerung: zurücksetzen der Keyboard-Flags bei Touch-Ende.
 */
document.getElementById("leftBTN").addEventListener("touchend", () => {
    keyboard.LEFT = false;
});

document.getElementById("rightBTN").addEventListener("touchend", () => {
    keyboard.RIGHT = false;
});

document.getElementById("buyBTN").addEventListener("touchend", () => {
    keyboard.V = false;
});

document.getElementById("attackBTN").addEventListener("touchend", () => {
    keyboard.F = false;
});

document.getElementById("jumpBTN").addEventListener("touchend", () => {
    keyboard.SPACE = false;
});
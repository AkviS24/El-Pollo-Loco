/**
 * @fileoverview Spielablauf: Initialisierung, Start, Pause, Neustart und Spielende.
 */

/**
 * Canvas-Element für das Spiel
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * Aktuelle Spielwelt
 * @type {World}
 */
let world;

/**
 * Zustand von Tastatur und Touch-Buttons
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Zentrale Verwaltung aller Sounds
 * @type {SoundManager}
 */
let soundManager = new SoundManager();

/**
 * IDs aller laufenden Spiel-Intervalle
 * @type {number[]}
 */
let intervalIds = [];

/**
 * TRUE, solange ein Spiel läuft (auch wenn es pausiert ist)
 * @type {boolean}
 */
let gameRunning = false;

/**
 * TRUE, solange das Spiel pausiert ist
 * @type {boolean}
 */
let gamePaused = false;

/**
 * Timeout-ID für die Anzeige des Endbildschirms
 * @type {number}
 */
let endGameTimeout;

/**
 * Startet ein Intervall, das automatisch pausiert und beim Spielende gestoppt wird.
 *
 * @param {Function} fn - Funktion, die wiederholt ausgeführt wird
 * @param {number} time - Abstand in Millisekunden
 * @returns {number} ID des Intervalls
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(() => {
        if (!gamePaused) fn();
    }, time);
    intervalIds.push(id);
    return id;
}

/** Stoppt alle Spiel-Intervalle. */
function clearAllIntervals() {
    intervalIds.forEach((id) => clearInterval(id));
    intervalIds = [];
}

/** Blendet Start- und Endbildschirm aus und startet ein neues Spiel. */
function startGame() {
    hideElement("start-screen");
    hideElement("end-screen");
    init();
}

/**
 * Initialisiert ein neues Spiel: Welt, Level, Steuerung und Musik.
 */
function init() {
    canvas = document.getElementById("canvas");
    keyboard.reset();
    gamePaused = false;
    world = new World(canvas, keyboard, createLevel1());
    gameRunning = true;
    setPlayingState(true);
    soundManager.play("gameStart");
    soundManager.playLoop("music");
}

/**
 * Stoppt das laufende Spiel: alle Intervalle, den Zeichen-Loop und ein geplantes Spielende.
 */
function stopGame() {
    clearAllIntervals();
    clearTimeout(endGameTimeout);
    if (world) cancelAnimationFrame(world.animationFrame);
    gameRunning = false;
    gamePaused = false;
    setPlayingState(false);
}

/**
 * Zeigt den Endbildschirm nach kurzer Verzögerung, damit die letzte Animation sichtbar ist.
 *
 * @param {boolean} won - TRUE bei Sieg, FALSE bei Niederlage
 */
function scheduleGameEnd(won) {
    endGameTimeout = setTimeout(() => showEndScreen(won), 1500);
}

/**
 * Beendet das Spiel und zeigt den Gewinn- bzw. Game-Over-Bildschirm.
 *
 * @param {boolean} won - TRUE bei Sieg, FALSE bei Niederlage
 */
function showEndScreen(won) {
    stopGame();
    soundManager.stopAll();
    soundManager.play(won ? "win" : "lose");
    renderEndScreen(won);
}

/** Startet das Spiel ohne Neuladen der Seite neu. */
function restartGame() {
    stopGame();
    soundManager.stopAll();
    startGame();
}

/** Beendet das Spiel und kehrt zum Startbildschirm zurück. */
function backToMenu() {
    stopGame();
    soundManager.stopAll();
    hideElement("end-screen");
    clearCanvas();
    showElement("start-screen");
}

/** Leert das Canvas, damit hinter dem Startbildschirm kein altes Spielbild stehen bleibt. */
function clearCanvas() {
    let gameCanvas = document.getElementById("canvas");
    gameCanvas.getContext("2d").clearRect(0, 0, gameCanvas.width, gameCanvas.height);
}

/** Pausiert das Spiel und alle Loop-Sounds. */
function pauseGame() {
    gamePaused = true;
    soundManager.pauseLoops();
}

/** Setzt ein pausiertes Spiel fort. */
function resumeGame() {
    gamePaused = false;
    world.character.wakeUp();
    if (!world.gameEnded) soundManager.playLoop("music");
}

/**
 * @fileoverview Bedienoberfläche: Bildschirme, Anleitung, Ton- und Vollbild-Button.
 */

/**
 * TRUE, wenn das Spiel durch das Öffnen der Anleitung pausiert wurde
 * @type {boolean}
 */
let pausedByHelp = false;

/**
 * Media Query für Mobilgeräte im Hochformat (identisch mit der CSS-Regel)
 * @type {string}
 */
const portraitMobileQuery = "(orientation: portrait) and (pointer: coarse), (orientation: portrait) and (max-width: 900px)";

/**
 * Inhalte des Endbildschirms
 * @type {{won: {image: string, alt: string, text: string}, lost: {image: string, alt: string, text: string}}}
 */
const endScreenContent = {
    won: {
        image: "./img/You won, you lost/You won A.png",
        alt: "You won!",
        text: "¡Olé! Du hast die verrückte Riesenhenne besiegt."
    },
    lost: {
        image: "./img/You won, you lost/Game Over.png",
        alt: "Game Over",
        text: "Die Hühner waren diesmal stärker. Versuch es gleich nochmal!"
    }
};

/**
 * Blendet ein Element ein.
 *
 * @param {string} id - ID des Elements
 */
function showElement(id) {
    document.getElementById(id).classList.remove("d-none");
}

/**
 * Blendet ein Element aus.
 *
 * @param {string} id - ID des Elements
 */
function hideElement(id) {
    document.getElementById(id).classList.add("d-none");
}

/**
 * Markiert die Seite als "im Spiel", damit z.B. die Touch-Steuerung eingeblendet wird.
 *
 * @param {boolean} isPlaying - TRUE, solange ein Spiel läuft
 */
function setPlayingState(isPlaying) {
    document.body.classList.toggle("is-playing", isPlaying);
}

/**
 * Prüft, ob die Anleitung gerade geöffnet ist.
 *
 * @returns {boolean} TRUE, wenn die Anleitung sichtbar ist
 */
function isHelpOpen() {
    return !document.getElementById("help-screen").classList.contains("d-none");
}

/**
 * Öffnet die Anleitung. Läuft gerade ein Spiel, wird es dabei pausiert.
 */
function openHelp() {
    if (isHelpOpen()) return;
    if (gameRunning && !gamePaused) {
        pauseGame();
        pausedByHelp = true;
    }
    updateHelpActions();
    showElement("help-screen");
    document.getElementById("help-close-button").focus();
}

/** Schließt die Anleitung und setzt ein pausiertes Spiel fort. */
function closeHelp() {
    hideElement("help-screen");
    if (pausedByHelp) {
        pausedByHelp = false;
        resumeGame();
    }
}

/**
 * Schließt die Anleitung, wenn neben den Dialog geklickt wird.
 *
 * @param {MouseEvent} event - Das Klick-Event
 */
function handleOutsideHelpClick(event) {
    if (!isHelpOpen() || event.target.closest(".help-card, .js-open-help")) return;
    closeHelp();
}

/** Schließt die Anleitung und startet ein neues Spiel, falls noch keines läuft. */
function confirmHelp() {
    closeHelp();
    if (!gameRunning) startGame();
}

/** Beendet das laufende Spiel aus der Anleitung heraus und zeigt das Hauptmenü. */
function quitToMenu() {
    pausedByHelp = false;
    hideElement("help-screen");
    backToMenu();
}

/** Passt Hinweis und Buttons der Anleitung daran an, ob gerade ein Spiel läuft. */
function updateHelpActions() {
    document.getElementById("help-paused-badge").classList.toggle("d-none", !gameRunning);
    document.getElementById("help-menu-button").classList.toggle("d-none", !gameRunning);
    document.getElementById("help-close-label").textContent = gameRunning ? "Weiterspielen" : "Spiel starten";
}

/**
 * Füllt den Endbildschirm mit Bild und Text und blendet ihn ein.
 *
 * @param {boolean} won - TRUE bei Sieg, FALSE bei Niederlage
 */
function renderEndScreen(won) {
    let content = won ? endScreenContent.won : endScreenContent.lost;
    let image = document.getElementById("end-image");
    image.src = content.image;
    image.alt = content.alt;
    document.getElementById("end-text").textContent = content.text;
    document.getElementById("end-screen").classList.toggle("is-win", won);
    pausedByHelp = false;
    hideElement("help-screen");
    showElement("end-screen");
}

/** Schaltet den Ton um und aktualisiert das Icon. */
function toggleMute() {
    soundManager.toggleMute();
    updateMuteButton();
}

/** Zeigt am Ton-Button an, ob der Ton gerade an oder aus ist. */
function updateMuteButton() {
    let muted = soundManager.muted;
    let label = muted ? "Ton einschalten" : "Ton ausschalten";
    let button = document.getElementById("mute-button");
    document.getElementById("mute-icon").src = muted ? "./img/icons/volume-off.svg" : "./img/icons/volume-on.svg";
    button.setAttribute("aria-label", label);
    button.setAttribute("aria-pressed", String(muted));
    button.title = label;
    button.classList.toggle("is-active", muted);
}

/** Schaltet den Vollbildmodus für das Spiel ein bzw. aus. */
function toggleFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.getElementById("game-container").requestFullscreen();
    }
}

/** Zeigt am Vollbild-Button an, ob der Vollbildmodus aktiv ist. */
function updateFullscreenButton() {
    let active = Boolean(document.fullscreenElement);
    let label = active ? "Vollbild verlassen" : "Vollbild";
    let button = document.getElementById("fullscreen-button");
    document.getElementById("fullscreen-icon").src = active ? "./img/icons/fullscreen-exit.svg" : "./img/icons/fullscreen.svg";
    button.setAttribute("aria-label", label);
    button.title = label;
}

/** Pausiert das Spiel automatisch, wenn der Tab im Hintergrund ist. */
function handleVisibilityChange() {
    if (document.hidden && gameRunning && !gamePaused) openHelp();
}

/**
 * Pausiert das Spiel, wenn ein Mobilgerät ins Hochformat gedreht wird.
 *
 * @param {MediaQueryListEvent} event - Änderung der Ausrichtung
 */
function handleOrientationChange(event) {
    if (event.matches && gameRunning && !gamePaused) openHelp();
}

/**
 * Initialisiert die Bedienoberfläche nach dem Laden der Seite.
 */
function initUi() {
    updateMuteButton();
    updateFullscreenButton();
    if (!document.fullscreenEnabled) hideElement("fullscreen-button");
    bindMobileControls();
    document.addEventListener("fullscreenchange", updateFullscreenButton);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("click", handleOutsideHelpClick);
    window.matchMedia(portraitMobileQuery).addEventListener("change", handleOrientationChange);
}

document.addEventListener("DOMContentLoaded", initUi);

/**
 * @fileoverview Eingaben: Tastatur und Touch-Buttons für mobile Geräte.
 */

/**
 * Zuordnung von Tastencodes zu Aktionen im Keyboard-Objekt
 * @type {Object.<string, string>}
 */
const keyBindings = {
    ArrowLeft: "LEFT",
    KeyA: "LEFT",
    ArrowRight: "RIGHT",
    KeyD: "RIGHT",
    ArrowUp: "UP",
    KeyW: "UP",
    Space: "SPACE",
    KeyF: "F",
    KeyV: "V"
};

/**
 * Zuordnung der Touch-Buttons zu Aktionen im Keyboard-Objekt
 * @type {Object.<string, string>}
 */
const touchBindings = {
    "touch-left": "LEFT",
    "touch-right": "RIGHT",
    "touch-jump": "SPACE",
    "touch-throw": "F",
    "touch-buy": "V"
};

/**
 * Setzt die passende Aktion bei Tastendruck bzw. Loslassen.
 * Während des Spiels wird das Standardverhalten (z.B. Scrollen mit der Leertaste) verhindert.
 *
 * @param {KeyboardEvent} event - Das Tastatur-Event
 * @param {boolean} isPressed - TRUE bei keydown, FALSE bei keyup
 */
function handleKey(event, isPressed) {
    let action = keyBindings[event.code];
    if (!action) return;
    keyboard[action] = isPressed;
    if (gameRunning) event.preventDefault();
}

/**
 * Setzt die passende Aktion, wenn ein Steuerungs-Button gedrückt oder losgelassen wird.
 * Pointer-Events funktionieren mit Finger, Stift und Maus gleichermaßen.
 *
 * @param {PointerEvent} event - Das Pointer-Event
 * @param {string} action - Aktion im Keyboard-Objekt
 * @param {boolean} isPressed - TRUE beim Drücken, FALSE beim Loslassen
 */
function handleControlButton(event, action, isPressed) {
    event.preventDefault();
    keyboard[action] = isPressed;
    event.currentTarget.classList.toggle("is-pressed", isPressed);
}

/**
 * Verknüpft einen Steuerungs-Button mit seiner Aktion und deaktiviert das Kontextmenü.
 *
 * @param {HTMLElement} button - Der Steuerungs-Button
 * @param {string} action - Aktion im Keyboard-Objekt
 */
function bindControlButton(button, action) {
    button.addEventListener("pointerdown", (e) => {
        button.setPointerCapture(e.pointerId);
        handleControlButton(e, action, true);
    });
    ["pointerup", "pointercancel", "lostpointercapture"].forEach((type) => {
        button.addEventListener(type, (e) => handleControlButton(e, action, false));
    });
    button.addEventListener("contextmenu", (e) => e.preventDefault());
}

/**
 * Verknüpft alle Touch-Buttons mit den zugehörigen Aktionen.
 */
function bindMobileControls() {
    Object.entries(touchBindings).forEach(([id, action]) => {
        bindControlButton(document.getElementById(id), action);
    });
}

/** Escape pausiert das Spiel (öffnet die Anleitung) bzw. schließt die Anleitung wieder. */
function toggleHelpWithEscape() {
    if (isHelpOpen()) closeHelp();
    else if (gameRunning) openHelp();
}

window.addEventListener("keydown", (event) => {
    if (event.code === "Escape") toggleHelpWithEscape();
    handleKey(event, true);
});

window.addEventListener("keyup", (event) => handleKey(event, false));

window.addEventListener("blur", () => keyboard.reset());

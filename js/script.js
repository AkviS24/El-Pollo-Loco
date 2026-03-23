/**
 * Wartet, bis der DOM-Inhalt vollständig geladen ist, und blendet dann den Startbildschirm aus.
 * Nach einer Verzögerung von 5 Sekunden wird die `init()`-Funktion aufgerufen, um das Spiel zu starten.
 */

function gamestart() {
        document.getElementById("start-screen").classList.remove("start-screen");
        document.getElementById("start-screen").classList.add("start-screen-non-visible");
        init();
    }
    
document.addEventListener("DOMContentLoaded", () => {

    /** @type {HTMLElement} Startbildschirm-Element */
    const startscreen = document.getElementById("startscreen");

    setTimeout(() => {
        startscreen.classList.add("hidden");
    }, 5000);
});


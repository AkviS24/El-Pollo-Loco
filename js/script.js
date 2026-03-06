/**
 * Wartet, bis der DOM-Inhalt vollständig geladen ist, und blendet dann den Startbildschirm aus.
 * Nach einer Verzögerung von 5 Sekunden wird die `init()`-Funktion aufgerufen, um das Spiel zu starten.
 */
document.addEventListener("DOMContentLoaded", () => {

    /** @type {HTMLElement} Startbildschirm-Element */
    const startscreen = document.getElementById("startscreen");

    setTimeout(() => {
        startscreen.classList.add("hidden");
        init();
    }, 5000);
});


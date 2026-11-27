/**
 * Basisklasse für alle zeichenbaren Objekte im Spiel.
 * Stellt grundlegende Eigenschaften wie Position, Größe
 * sowie Funktionen zum Laden und Zeichnen von Bildern bereit.
 */
class DrawableObject {

    /**
     * X-Position des Objekts
     * @type {number}
     */
    x = 120;

    /**
     * Y-Position des Objekts
     * @type {number}
     */
    y = 280;

    /**
     * Aktuelles Bild des Objekts
     * @type {HTMLImageElement}
     */
    img;

    /**
     * Höhe des Objekts
     * @type {number}
     */
    height = 150;

    /**
     * Breite des Objekts
     * @type {number}
     */
    width = 100;

    /**
     * Cache für bereits geladene Bilder.
     * Wird verwendet, um Animationen effizient darzustellen.
     *
     * @type {Object.<string, HTMLImageElement>}
     */
    imageCache = {};

    /**
     * Index des aktuell angezeigten Animationsbildes
     * @type {number}
     */
    currentImage = 0;

    /**
     * Zeichnet das Objekt auf das Canvas, sobald sein Bild geladen ist.
     *
     * @param {CanvasRenderingContext2D} ctx - Der Canvas Rendering Context
     */
    draw(ctx) {
        if (this.img && this.img.complete) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    /**
     * Lädt ein einzelnes Bild und setzt es als aktuelles Bild.
     *
     * @param {string} path - Pfad zur Bilddatei
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Lädt mehrere Bilder und speichert sie im Image-Cache.
     * Wird hauptsächlich für Animationen verwendet.
     *
     * @param {string[]} arr - Array mit Bildpfaden
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}

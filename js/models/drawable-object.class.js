/**
 * Basisklasse für alle zeichnbaren Objekte im Spiel.
 * Stellt grundlegende Eigenschaften wie Position, Größe
 * sowie Funktionen zum Laden und Zeichnen von Bildern bereit.
 */
class DrawableObject {

    /** @type {number} X-Position des Objekts */
    x = 120;

    /** @type {number} Y-Position des Objekts */
    y = 280;

    /** @type {HTMLImageElement} Aktuelles Bild des Objekts */
    img;

    /** @type {number} Höhe des Objekts */
    height = 150;

    /** @type {number} Breite des Objekts */
    width = 100;

    /**
     * Cache für bereits geladene Bilder.
     * Wird verwendet um Animationen effizient darzustellen.
     * 
     * @type {Object.<string, HTMLImageElement>}
     */
    imageCache = {};

    /** @type {number} Index des aktuell angezeigten Animationsbildes */
    currentImage = 0;

    /**
     * Zeichnet das Objekt auf das Canvas.
     * 
     * @param {CanvasRenderingContext2D} ctx - Der Canvas Rendering Context
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Zeichnet einen Debug-Rahmen um das Objekt.
     * Wird hauptsächlich für Kollisionsboxen verwendet.
     * 
     * @param {CanvasRenderingContext2D} ctx - Der Canvas Rendering Context
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "transparent";
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
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
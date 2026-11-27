/**
 * Statusleiste im HUD (Leben, Münzen, Flaschen oder Endboss).
 * Zeigt abhängig vom Prozentsatz ein anderes Bild und optional eine Anzahl daneben.
 *
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {

    /**
     * Prozentstufen, für die es jeweils ein Bild gibt
     * @type {number[]}
     */
    static imageSteps = [0, 20, 40, 60, 80, 100];

    /**
     * Bildpfad-Präfix je Leistentyp
     * @type {Object.<string, string>}
     */
    static imagePaths = {
        health: "./img/7_statusbars/1_statusbar/2_statusbar_health/green/",
        coin: "./img/7_statusbars/1_statusbar/1_statusbar_coin/orange/",
        bottle: "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/",
        endboss: "./img/7_statusbars/2_statusbar_endboss/orange/orange"
    };

    /**
     * Bildpfade für die einzelnen Prozentstufen
     * @type {string[]}
     */
    IMAGES = [];

    /**
     * Breite der Leiste
     * @type {number}
     */
    width = 190;

    /**
     * Höhe der Leiste
     * @type {number}
     */
    height = 50;

    /**
     * Aktueller Prozentsatz der Leiste (0-100)
     * @type {number}
     */
    percentage = 100;

    /**
     * Anzahl, die neben der Leiste angezeigt wird (null = keine Anzeige)
     * @type {number|null}
     */
    count = null;

    /**
     * Erstellt eine neue Statusleiste.
     *
     * @param {"health"|"coin"|"bottle"|"endboss"} type - Art der Leiste
     * @param {number} x - X-Position im HUD
     * @param {number} y - Y-Position im HUD
     */
    constructor(type, x, y) {
        super();
        this.IMAGES = StatusBar.imageSteps.map((step) => `${StatusBar.imagePaths[type]}${step}.png`);
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.setPercentage(100);
    }

    /**
     * Setzt den Prozentsatz der Leiste und aktualisiert das Bild.
     *
     * @param {number} percentage - Neuer Prozentsatz (wird auf 0-100 begrenzt)
     */
    setPercentage(percentage) {
        this.percentage = Math.max(0, Math.min(100, percentage));
        this.img = this.imageCache[this.IMAGES[this.resolveImageIndex()]];
    }

    /**
     * Bestimmt den Bildindex anhand des Prozentsatzes.
     * Solange noch etwas übrig ist, wird mindestens die erste Stufe angezeigt.
     *
     * @returns {number} Index des passenden Bildes
     */
    resolveImageIndex() {
        if (this.percentage >= 100) return 5;
        if (this.percentage >= 80) return 4;
        if (this.percentage >= 60) return 3;
        if (this.percentage >= 40) return 2;
        if (this.percentage > 0) return 1;
        return 0;
    }

    /**
     * Zeichnet die Leiste und – falls gesetzt – die Anzahl daneben.
     *
     * @param {CanvasRenderingContext2D} ctx - Der Canvas Rendering Context
     */
    draw(ctx) {
        super.draw(ctx);
        if (this.count !== null) this.drawCount(ctx);
    }

    /**
     * Zeichnet die Anzahl als Text mit Kontur rechts neben die Leiste.
     *
     * @param {CanvasRenderingContext2D} ctx - Der Canvas Rendering Context
     */
    drawCount(ctx) {
        let x = this.x + this.width + 4;
        let y = this.y + this.height * 0.62;
        ctx.save();
        ctx.font = "26px Boogaloo, Arial, sans-serif";
        ctx.textBaseline = "middle";
        ctx.lineJoin = "round";
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#3a1a00";
        ctx.fillStyle = "#fff6e5";
        ctx.strokeText(this.count, x, y);
        ctx.fillText(this.count, x, y);
        ctx.restore();
    }
}

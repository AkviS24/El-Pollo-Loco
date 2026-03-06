/**
 * Repräsentiert eine Statusleiste (z.B. Lebensanzeige) im Spiel.
 * Zeigt unterschiedliche Bilder abhängig vom aktuellen Prozentsatz.
 * 
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
    
    /**
     * Array von Bildpfaden für verschiedene Prozentstufen (0-100%).
     * @type {string[]}
     */
    IMAGES = [
        "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
        "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
        "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
        "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
        "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
        "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png"
    ];

    /** @type {number} Aktueller Prozentsatz der Statusleiste (0-100) */
    percentage = 100;

    /**
     * Erstellt eine neue Statusleiste, lädt Bilder und setzt Position & Größe.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Setzt den Prozentsatz der Statusleiste und aktualisiert das Bild.
     * 
     * @param {number} percentage - Neuer Prozentsatz (0-100)
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Bestimmt den Index des Bildes im Array basierend auf dem aktuellen Prozentsatz.
     * 
     * @returns {number} Index des passenden Statusbar-Bildes
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
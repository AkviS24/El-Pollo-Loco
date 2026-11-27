/**
 * Repräsentiert den Zustand der Steuerung (Tastatur und Touch-Buttons).
 * Jede Eigenschaft ist ein Boolean, der angibt, ob die jeweilige Aktion gerade gedrückt ist.
 */
class Keyboard {

    /**
     * TRUE, wenn nach links gelaufen wird (Pfeil links / A)
     * @type {boolean}
     */
    LEFT = false;

    /**
     * TRUE, wenn nach rechts gelaufen wird (Pfeil rechts / D)
     * @type {boolean}
     */
    RIGHT = false;

    /**
     * TRUE, wenn Pfeil oben / W gedrückt wird (springen)
     * @type {boolean}
     */
    UP = false;

    /**
     * TRUE, wenn die Leertaste gedrückt wird (springen)
     * @type {boolean}
     */
    SPACE = false;

    /**
     * TRUE, wenn "F" gedrückt wird (Flasche werfen)
     * @type {boolean}
     */
    F = false;

    /**
     * TRUE, wenn "V" gedrückt wird (Flasche kaufen)
     * @type {boolean}
     */
    V = false;

    /**
     * Prüft, ob gerade irgendeine Spieltaste gedrückt ist.
     *
     * @returns {boolean} TRUE, wenn mindestens eine Taste gedrückt ist
     */
    isAnyKeyPressed() {
        return this.LEFT || this.RIGHT || this.UP || this.SPACE || this.F || this.V;
    }

    /** Setzt alle Tasten auf "nicht gedrückt" zurück. */
    reset() {
        this.LEFT = false;
        this.RIGHT = false;
        this.UP = false;
        this.SPACE = false;
        this.F = false;
        this.V = false;
    }
}

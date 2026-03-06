/**
 * Repräsentiert den Zustand der Tastatur für das Spiel.
 * Jede Eigenschaft ist ein Boolean, der angibt, ob die jeweilige Taste gedrückt ist.
 */
class Keyboard {

    /** @type {boolean} TRUE, wenn die linke Pfeiltaste gedrückt wird */
    LEFT = false;

    /** @type {boolean} TRUE, wenn die rechte Pfeiltaste gedrückt wird */
    RIGHT = false;

    /** @type {boolean} TRUE, wenn die obere Pfeiltaste gedrückt wird */
    UP = false;

    /** @type {boolean} TRUE, wenn die untere Pfeiltaste gedrückt wird */
    DOWN = false;

    /** @type {boolean} TRUE, wenn die Leertaste gedrückt wird */
    SPACE = false;

    /** @type {boolean} TRUE, wenn die Taste "F" gedrückt wird */
    F = false;

    /** @type {boolean} TRUE, wenn die Taste "V" gedrückt wird */
    V = false;
}
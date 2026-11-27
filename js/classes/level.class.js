/**
 * Repräsentiert ein Level im Spiel.
 * Enthält Gegner, Wolken, Hintergrund, Sammelobjekte und die X-Position, an der das Level endet.
 */
class Level {

    /**
     * Liste der Gegner im Level (inkl. Endboss)
     * @type {Enemy[]}
     */
    enemies;

    /**
     * Liste der Wolken im Level
     * @type {Cloud[]}
     */
    clouds;

    /**
     * Liste der Hintergrundobjekte im Level
     * @type {BackgroundObjects[]}
     */
    backgroundObjects;

    /**
     * Münzen, die eingesammelt werden können
     * @type {Coin[]}
     */
    coins;

    /**
     * Flaschen, die eingesammelt werden können
     * @type {SalsaBottle[]}
     */
    bottles;

    /**
     * X-Position, bis zu der Pepe laufen kann
     * @type {number}
     */
    levelEndX;

    /**
     * Erstellt ein neues Level mit den angegebenen Objekten.
     *
     * @param {Enemy[]} enemies - Gegner im Level
     * @param {Cloud[]} clouds - Wolken im Level
     * @param {BackgroundObjects[]} backgroundObjects - Hintergrundebenen
     * @param {Coin[]} coins - Einsammelbare Münzen
     * @param {SalsaBottle[]} bottles - Einsammelbare Flaschen
     * @param {number} levelEndX - X-Position, an der das Level endet
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles, levelEndX) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.levelEndX = levelEndX;
    }
}

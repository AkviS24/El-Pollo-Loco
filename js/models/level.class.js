/**
 * Repräsentiert ein Level im Spiel.
 * Enthält Gegner, Wolken, Hintergrundobjekte und die X-Position, an der das Level endet.
 */
class Level {

    /** @type {Array<Object>} Liste der Gegner im Level */
    enemies;

    /** @type {Array<Object>} Liste der Wolken im Level */
    clouds;

    /** @type {Array<Object>} Liste der Hintergrundobjekte im Level */
    backgroundObjects;

    /** @type {number} X-Position, an der das Level endet (hier nach 2 Bildschirmen) */
    level_end_x = 719 * 2;

    /**
     * Erstellt ein neues Level mit den angegebenen Objekten.
     * 
     * @param {Array<Object>} enemies - Array der Gegnerobjekte im Level.
     * @param {Array<Object>} clouds - Array der Wolkenobjekte im Level.
     * @param {Array<Object>} backgroundObjects - Array der Hintergrundobjekte im Level.
     */
    constructor(enemies, clouds, backgroundObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
 }}
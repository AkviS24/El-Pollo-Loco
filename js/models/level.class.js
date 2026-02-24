class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 719 * 2; // Level endet nach 2 Bildschirmen

    constructor(enemies, clouds, backgroundObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
 }}
/**
 * Breite eines Hintergrund-Segments
 * @type {number}
 */
const segmentWidth = 719;

/**
 * X-Position, bis zu der Pepe laufen kann
 * @type {number}
 */
const level1EndX = segmentWidth * 4;

/**
 * Erstellt das erste Level des Spiels.
 * Wird bei jedem (Neu-)Start aufgerufen, damit alle Objekte frisch erzeugt werden.
 *
 * @returns {Level} Neues Level-Objekt
 */
function createLevel1() {
    return new Level(
        createEnemies(),
        createClouds(),
        createBackgroundObjects(),
        createCoins(),
        createBottles(),
        level1EndX
    );
}

/**
 * Erstellt abwechselnd normale Hühner und Küken sowie den Endboss am Levelende.
 *
 * @returns {Enemy[]} Alle Gegner des Levels
 */
function createEnemies() {
    let enemies = [];
    for (let i = 0; i < 10; i++) {
        let x = 700 + i * 220 + Math.random() * 120;
        enemies.push(i % 2 === 0 ? new Chicken(x) : new SmallChicken(x));
    }
    enemies.push(new Endboss(level1EndX + 180));
    return enemies;
}

/**
 * Erstellt Münzen in drei Bögen (zum Teil nur mit Sprung erreichbar) und einige Einzelmünzen.
 *
 * @returns {Coin[]} Alle Münzen des Levels
 */
function createCoins() {
    let coins = [];
    [450, 1150, 1850].forEach((startX) => {
        [270, 205, 170, 205, 270].forEach((y, i) => coins.push(new Coin(startX + i * 70, y)));
    });
    [2350, 2500, 2650].forEach((x) => coins.push(new Coin(x, 220)));
    return coins;
}

/**
 * Erstellt die am Boden liegenden Salsa-Flaschen.
 *
 * @returns {SalsaBottle[]} Alle Flaschen des Levels
 */
function createBottles() {
    return [330, 620, 900, 1300, 1550, 1750, 2000, 2200, 2420, 2700].map((x) => new SalsaBottle(x));
}

/**
 * Erstellt die Wolken, die über das ganze Level verteilt sind.
 *
 * @returns {Cloud[]} Alle Wolken des Levels
 */
function createClouds() {
    let clouds = [];
    for (let i = 0; i < 6; i++) {
        clouds.push(new Cloud(i * 720, `./img/5_background/layers/4_clouds/${i % 2 + 1}.png`));
    }
    return clouds;
}

/**
 * Erstellt die Hintergrund-Segmente vom linken bis zum rechten Levelrand.
 *
 * @returns {BackgroundObjects[]} Alle Hintergrundebenen
 */
function createBackgroundObjects() {
    let objects = [];
    for (let i = -1; i <= 4; i++) {
        let variant = Math.abs(i) % 2 + 1;
        objects.push(...createBackgroundSegment(i * segmentWidth, variant));
    }
    return objects;
}

/**
 * Erstellt ein Hintergrund-Segment aus vier Ebenen (Himmel, hinten, Mitte, vorne).
 *
 * @param {number} x - X-Position des Segments
 * @param {number} variant - Bildvariante (1 oder 2), damit die Segmente nahtlos aneinanderpassen
 * @returns {BackgroundObjects[]} Die vier Ebenen des Segments
 */
function createBackgroundSegment(x, variant) {
    return [
        new BackgroundObjects("./img/5_background/layers/air.png", x),
        new BackgroundObjects(`./img/5_background/layers/3_third_layer/${variant}.png`, x),
        new BackgroundObjects(`./img/5_background/layers/2_second_layer/${variant}.png`, x),
        new BackgroundObjects(`./img/5_background/layers/1_first_layer/${variant}.png`, x)
    ];
}

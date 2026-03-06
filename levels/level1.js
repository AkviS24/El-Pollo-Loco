/**
 * Erstellt das erste Level des Spiels.
 * 
 * Das Level besteht aus:
 * - mehreren Gegnern (Chicken und Endboss)
 * - Wolken im Hintergrund
 * - verschiedenen Hintergrundebenen für den Parallax-Effekt
 * 
 * @type {Level}
 */
let level1 = new Level(
    [
        /** @type {Array<Chicken|Endboss>} Gegner im Level */
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],
    [
        /** @type {Array<Cloud>} Wolken im Hintergrund */
        new Cloud(),
    ],
    [
        /**
         * Hintergrundobjekte für den Parallax-Hintergrund.
         * Die X-Position bestimmt, an welcher Stelle das jeweilige Bild beginnt.
         * Mehrere Layer erzeugen eine Tiefenwirkung im Spiel.
         * 
         * @type {Array<BackgroundObjects>}
         */
        new BackgroundObjects("./img/5_background/layers/air.png", -720),
        new BackgroundObjects("./img/5_background/layers/3_third_layer/2.png", -720),
        new BackgroundObjects("./img/5_background/layers/2_second_layer/2.png", -720),
        new BackgroundObjects("./img/5_background/layers/1_first_layer/2.png", -720),

        new BackgroundObjects("./img/5_background/layers/air.png", 0),
        new BackgroundObjects("./img/5_background/layers/3_third_layer/1.png", 0),
        new BackgroundObjects("./img/5_background/layers/2_second_layer/1.png", 0),
        new BackgroundObjects("./img/5_background/layers/1_first_layer/1.png", 0),

        new BackgroundObjects("./img/5_background/layers/air.png", 719),
        new BackgroundObjects("./img/5_background/layers/3_third_layer/2.png", 719),
        new BackgroundObjects("./img/5_background/layers/2_second_layer/2.png", 719),
        new BackgroundObjects("./img/5_background/layers/1_first_layer/2.png", 719),

        new BackgroundObjects("./img/5_background/layers/air.png", 719 * 2),
        new BackgroundObjects("./img/5_background/layers/3_third_layer/1.png", 719 * 2),
        new BackgroundObjects("./img/5_background/layers/2_second_layer/1.png", 719 * 2),
        new BackgroundObjects("./img/5_background/layers/1_first_layer/1.png", 719 * 2)
    ]
);
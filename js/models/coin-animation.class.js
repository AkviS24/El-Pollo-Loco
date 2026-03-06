/**
 * Animationsobjekt für eingesammelte Coins.
 * Wird kurz angezeigt, wenn der Spieler einen Coin einsammelt
 * und bewegt sich leicht nach oben während die Animation abgespielt wird.
 * 
 * @extends MovableObject
 */
class CoinAnimation extends MovableObject {
    
    /**
     * Bilder für die Coin-Animation
     * @type {string[]}
     */
    IMAGES = [
        "./img/8_coin/coin_1.png",
        "./img/8_coin/coin_2.png"
    ];

    /**
     * Erstellt eine neue Coin-Animation.
     * 
     * @param {World} world - Referenz zur aktuellen Spielwelt
     * @param {number} x - X-Position der Animation
     * @param {number} y - Y-Position der Animation
     */
    constructor(world, x, y) {
        super();

        /** @type {World} */
        this.world = world;

        /** @type {number} X-Position der Animation */
        this.x = x;

        /** @type {number} Y-Position der Animation */
        this.y = y;

        /** @type {number} Breite der Animation */
        this.width = 50;

        /** @type {number} Höhe der Animation */
        this.height = 50;

        /** @type {number} Vertikale Geschwindigkeit der Animation */
        this.speedY = 1;

        this.loadImages(this.IMAGES);
        this.loadImage(this.IMAGES[0]);

        this.animate();

        // Animation nach 1 Sekunde automatisch entfernen
        setTimeout(() => {
            clearInterval(this.interval);
            let idx = this.world.coinAnimations.indexOf(this);
            if (idx >= 0) this.world.coinAnimations.splice(idx, 1);
        }, 1000);
    }

    /**
     * Startet die Coin-Animation.
     * Spielt die Bilder der Animation ab und bewegt
     * das Objekt leicht nach oben.
     */
    animate() {
        this.interval = setInterval(() => {
            this.playAnimation(this.IMAGES);
            this.y -= this.speedY;
        }, 100);
        if (this.world && this.world.intervals) {
            this.world.intervals.push(this.interval);
        }
    }
}

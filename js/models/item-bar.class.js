/**
 * Repräsentiert die Item-Leiste im Spiel (Flaschen & Münzen).
 * Wird auf der Spieloberfläche gezeichnet und zeigt aktuelle Bestände an.
 * 
 * @extends DrawableObject
 */
class ItemBar extends DrawableObject {
    
    /**
     * Erstellt eine neue Item-Leiste für die angegebene Welt.
     * 
     * @param {Object} world - Die Spielwelt, die Charakterinformationen enthält (z.B. Flaschen & Münzen).
     */
    constructor(world) {
        super();

        /** @type {Object} Weltobjekt mit Charakterinformationen */
        this.world = world;

        /** @type {number} X-Position der Item-Leiste */
        this.x = 40;

        /** @type {number} Y-Position der Item-Leiste */
        this.y = 70;

        /** @type {number} Breite der Item-Leiste */
        this.width = 200;

        /** @type {number} Höhe der Item-Leiste */
        this.height = 60;
    }

    /**
     * Zeichnet die komplette Item-Leiste auf das Canvas.
     * 
     * @param {CanvasRenderingContext2D} ctx - Der Zeichenkontext des Canvas.
     */
    draw(ctx) {
        this.drawBottles(ctx);
        this.drawCoins(ctx);
    }

    /**
     * Zeichnet die Flaschenanzeige inklusive Text für die aktuelle Anzahl.
     * 
     * @param {CanvasRenderingContext2D} ctx - Der Zeichenkontext des Canvas.
     */
    drawBottles(ctx) {
        ctx.save();
        let bottleImg = new Image();
        bottleImg.src = "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png";
        
        if (bottleImg.complete) {
            ctx.drawImage(bottleImg, this.x, this.y, 40, 50);
        } else {
            bottleImg.onload = () => {
                ctx.drawImage(bottleImg, this.x, this.y, 40, 50);
            };
        }
        
        // Text mit Flaschenanzahl
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.fillText("x " + this.world.character.bottles, this.x + 50, this.y + 35);
        
        ctx.restore();
    }

    /**
     * Zeichnet die Münzanzeige inklusive Text für die aktuelle Anzahl.
     * 
     * @param {CanvasRenderingContext2D} ctx - Der Zeichenkontext des Canvas.
     */
    drawCoins(ctx) {
        ctx.save();
        
        let coinImg = new Image();
        coinImg.src = "./img/8_coin/coin_1.png";
        
        if (coinImg.complete) {
            ctx.drawImage(coinImg, this.x + 120, this.y, 40, 50);
        } else {
            coinImg.onload = () => {
                ctx.drawImage(coinImg, this.x + 120, this.y, 40, 50);
            };
        }
        
        // Text mit Münzanzahl
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.fillText("x " + this.world.character.coins, this.x + 170, this.y + 35);
        
        ctx.restore();
    }
}

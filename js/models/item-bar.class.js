class ItemBar extends DrawableObject {
    
    constructor(world) {
        super();
        this.world = world;
        this.x = 40;
        this.y = 70;
        this.width = 200;
        this.height = 60;
    }

    draw(ctx) {
        this.drawBottles(ctx);
        this.drawCoins(ctx);
    }

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

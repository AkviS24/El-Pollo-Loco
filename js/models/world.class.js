class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud(),
    ];
    backgroundObjects = [
        new BackgroundObjects("./img/5_background/layers/3_third_layer/1.png"),
    ];
    ctx;
    canvas;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.enemies.forEach(enemy => {
            this.addToMap(enemy);
        });
        
        this.clouds.forEach(cloud => {
            this.addToMap(cloud);
        });

        this.backgroundObjects.forEach(backgroundObject => {
            this.addToMap(backgroundObject);
        });
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }

    addToMap(mo) {
            this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}
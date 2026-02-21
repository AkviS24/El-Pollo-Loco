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
        this.addToMap(this.character);
        addObjectsToMap(this.enemies);
        addObjectsToMap(this.clouds);
        addObjectsToMap(this.backgroundObjects);
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(mo) {
            this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
    
}
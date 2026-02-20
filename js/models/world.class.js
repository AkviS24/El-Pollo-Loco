class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
    }

    draw() {
        console.log("draw world");
    }
}
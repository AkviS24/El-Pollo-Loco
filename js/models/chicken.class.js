class Chicken extends Character {
    y = 370;
    constructor() {
        super().loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.height = 60;
        this.width = 60;
        this.x = 300 + Math.random() * 500;
    }
};
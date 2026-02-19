class Character extends MovableObject {

    constructor() {
        super().loadImage("./assets/img/character/character.png");
    };
    jump() {
        console.log("jump");
    };
};
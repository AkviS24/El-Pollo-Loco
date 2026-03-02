class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    gravityInterval;

    applyGravity() {
        let id = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);

        this.gravityInterval = id;

        if (this.world && this.world.intervals) {
            this.world.intervals.push(id);
        }
    }

    isColliding(mo) {
        return this.x + this.offset.left + this.width - this.offset.right - this.offset.left > mo.x + mo.offset.left &&
            this.y + this.offset.top + this.height - this.offset.top - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.offset.left + mo.width - mo.offset.left - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.offset.top + mo.height - mo.offset.top - mo.offset.bottom;
    }

    hit() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
            world.character.dead.play();
        } else {
            this.lastHit = new Date().getTime();
            world.character.damage.play();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Differenz in ms
        timePassed = timePassed / 1000; // Umrechnung auf Sekunden
        return timePassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        world.character.hops.play();
        this.speedY = 30;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // Wenn am Ende des Arrays fängt er wieder von vorne an
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
};
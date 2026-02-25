class World {
    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = [];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this; //Set all characters world to this world, so they can access the world and its properties
    }

    run() {
        setInterval(() => {
           this.checkThrowObjects(); 
           this.checkCollisions();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.F) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }    
    }

    checkCollisions() {
         // Kollisionsabfrage zwischen Charakter und Gegnern
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0); // Kamera folgt dem Charakter, indem die ganze Welt verschoben wird

        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0); // Welt wird zurück geschoben damit die Statusleiste nicht mitverschoben wird
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0); // Welt wird wieder verschoben damit die Charaktere und Gegner wieder mitverschoben werden

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0); // Welt zurück verschieben, damit die UI-Elemente nicht mitverschoben werden

        // Draw Funktion ruft sich selber erneut auf!!!!
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        
        mo.draw(this.ctx);

        mo.drawFrame(this.ctx); // Zum Debuggen, zeigt die Hitboxen an

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}



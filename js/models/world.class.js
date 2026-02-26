class World {
    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    itemBar = new ItemBar(this);
    throwableObjects = [];
    coinAnimations = []; // einzelne Münz-Animationen nach Treffern


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
           this.checkCoinsToBottles();
           this.checkCollisions();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.F && this.character.bottles > 0) {
            // Flasche etwas tiefer starten, damit sie auch normale Hühner treffen kann
            let startY = this.character.y + this.character.height - 20; // knapp über dem Fußboden
            let bottle = new ThrowableObject(this.character.x + 100, startY);
            this.throwableObjects.push(bottle);
            this.character.bottles--;
            this.character.throwing.play();
        } else if (this.keyboard.F && this.character.bottles == 0) {
            this.character.pups.play();
        }   
    }

    checkCoinsToBottles() {
        if (this.keyboard.V) {
            if (this.character.coins >= 5) {
                this.character.coins -= 5;
                this.character.bottles += 1;
            } else {
                this.character.pups.play();
            }
            this.keyboard.V = false; // Verhindert mehrfaches Auslösen
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

        // Kollisionsabfrage zwischen geworfenen Flaschen und Gegnern
        for (let b = this.throwableObjects.length - 1; b >= 0; b--) {
            let bottle = this.throwableObjects[b];
            for (let e = this.level.enemies.length - 1; e >= 0; e--) {
                let enemy = this.level.enemies[e];
                if (bottle.isColliding(enemy)) {
                    enemy.hit();
                    bottle.speedY = 10;
                    bottle.speed = 0;

                    // Belohnung und Entfernen je nach Gegnertyp
                    if (enemy instanceof Chicken) {
                        this.character.coins += 1;
                        // Münzanimation erzeugen
                        this.coinAnimations.push(new CoinAnimation(this, enemy.x, enemy.y));
                        this.level.enemies.splice(e, 1);
                    } else if (enemy instanceof Endboss) {
                        this.character.coins += 5;
                        // Endboss erst entfernen, wenn er keine Energie mehr hat
                        if (enemy.isDead()) {
                            this.coinAnimations.push(new CoinAnimation(this, enemy.x, enemy.y));
                            this.level.enemies.splice(e, 1);
                            console.log("Endboss defeated");
                        }
                    }

                    // Flasche aus der Welt entfernen
                    this.throwableObjects.splice(b, 1);
                    break; // nach dem Treffer darf die Flasche nicht weiter geprüft werden
                }
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0); // Kamera folgt dem Charakter, indem die ganze Welt verschoben wird

        this.addObjectsToMap(this.level.backgroundObjects);

        this.content();

        // Draw Funktion ruft sich selber erneut auf!!!!
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    content() {
        
        this.ctx.translate(-this.camera_x, 0); // Welt wird zurück geschoben damit die Statusleiste nicht mitverschoben wird
        this.addToMap(this.statusBar);
        this.addToMap(this.itemBar);
        this.ctx.translate(this.camera_x, 0); // Welt wird wieder verschoben damit die Charaktere und Gegner wieder mitverschoben werden

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.coinAnimations);

        this.ctx.translate(-this.camera_x, 0); // Welt zurück verschieben, damit die UI-Elemente nicht mitverschoben werden
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



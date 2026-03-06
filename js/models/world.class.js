/**
 * Repräsentiert die Spielwelt, in der Charakter, Gegner, Items und die Benutzeroberfläche verwaltet werden.
 */
class World {

    /** @type {Character} Hauptcharakter des Spiels */
    character = new Character();

    /** @type {Level} Aktuelles Level, enthält Gegner, Hintergrund und Wolken */
    level = level1;

    /** @type {CanvasRenderingContext2D} Zeichenkontext des Canvas */
    ctx;

    /** @type {HTMLCanvasElement} HTML-Canvas-Element */
    canvas;

    /** @type {Keyboard} Tastatursteuerung */
    keyboard;

    /** @type {number} X-Verschiebung der Kamera */
    camera_x = 0;

    /** @type {StatusBar} Statusleiste für Lebensenergie des Charakters */
    statusBar = new StatusBar();

    /** @type {ItemBar} Item-Leiste für Flaschen und Münzen */
    itemBar = new ItemBar(this);

    /** @type {ThrowableObject[]} Array der geworfenen Objekte */
    throwableObjects = [];

    /** @type {CoinAnimation[]} Array der Münzanimationsobjekte */
    coinAnimations = [];

    /** @type {number[]} Array aller Intervall-IDs für das Spiel */
    intervals = [];

    /**
     * Erstellt eine neue Spielwelt, initialisiert Canvas, Tastatur, Zeichenlogik und das Level.
     * 
     * @param {HTMLCanvasElement} canvas - Canvas-Element, auf dem die Welt gezeichnet wird
     * @param {Keyboard} keyboard - Tastatursteuerung für das Spiel
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();

        /** @type {Audio} Spielstart-Sound */
        this.gamestartSound = new Audio("./audio/game/gameStart.mp3");
    }

    /**
     * Verbindet Charakter und Gegner mit der Welt und startet deren Animationen.
     */
    setWorld() {
        this.character.world = this; //Set all characters world to this world, so they can access the world and its properties
        if (this.character.gravityInterval) {
            this.intervals.push(this.character.gravityInterval);
        }
        if (this.character.moveInterval) {
            this.intervals.push(this.character.moveInterval);
        }
        if (this.character.statusInterval) {
            this.intervals.push(this.character.statusInterval);
        }
        this.character.animate();

        this.level.enemies.forEach(enemy => {
            enemy.world = this;
            if (enemy.moveInterval) this.intervals.push(enemy.moveInterval);
            if (enemy.statusInterval) this.intervals.push(enemy.statusInterval);
            if (enemy.animInterval) this.intervals.push(enemy.animInterval);
            if (enemy.hitSound) sounds.push(enemy.hitSound);
        });
    }

    /**
     * Startet wiederholende Spielprüfungen wie Kollisionen, Münz- und Flaschenlogik.
     */
    run() {
        let runInterval = setInterval(() => {
            this.checkThrowObjects();
            this.checkCoinsToBottles();
            this.checkCollisions();
        }, 200);
        this.intervals.push(runInterval);
        this.startChickenCreator();
    }

    /**
     * Startet einen Intervall, der regelmäßig neue Gegner (Chicken) erzeugt.
     */
    startChickenCreator() {
        let chickenCreatorInterval = setInterval(() => {
            let chicken = new Chicken();
            chicken.world = this;
            this.level.enemies.push(chicken);
        }, 5000);
        this.intervals.push(chickenCreatorInterval);
    }

    /**
     * Prüft, ob der Charakter eine Flasche werfen möchte und erstellt ein ThrowableObject.
     */
    checkThrowObjects() {
        if (this.keyboard.F && this.character.bottles > 0) {
            let startY = this.character.y + this.character.height - 20;
            let bottle = new ThrowableObject(this.character.x + 100, startY);
            bottle.world = this;
            this.throwableObjects.push(bottle);
            this.character.bottles--;
            this.character.throwing.play();
        } else if (this.keyboard.F && this.character.bottles == 0) {
            this.character.pups.play();
        }
    }

    /**
     * Wandelt Münzen in Flaschen um, wenn die Taste V gedrückt wird und genug Münzen vorhanden sind.
     */
    checkCoinsToBottles() {
        if (this.keyboard.V) {
            if (this.character.coins >= 5) {
                this.character.coins -= 5;
                this.character.bottles += 1;
            } else {
                this.character.pups.play();
            }
            this.keyboard.V = false;
        }
    }

    /**
     * Prüft Kollisionen zwischen Charakter, Gegnern und geworfenen Objekten.
     */
    checkCollisions() {
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
                    this.bottleLogic(e, enemy, b, bottle);
                    break;
                }
            }
        }
    }

    /**
     * Logik, wenn eine Flasche einen Gegner trifft.
     * @param {number} e - Index des Gegners
     * @param {MovableObject} enemy - Getroffener Gegner
     * @param {number} b - Index der Flasche
     * @param {ThrowableObject} bottle - Getroffene Flasche
     */
    bottleLogic(e, enemy, b, bottle) {
        enemy.hit();
        bottle.speedY = 10;
        bottle.speed = 0;

        // Belohnung und Entfernen je nach Gegnertyp
        if (enemy instanceof Chicken) {
            this.chickenDeath(e, enemy);
        } else if (enemy instanceof Endboss) {
            enemy.hitSound.play();
            this.endbossDeath(e, enemy);
        }
        this.throwableObjects.splice(b, 1); // Flasche aus der Welt entfernen
    }

    /**
     * Logik bei Tod eines Chickens.
     * @param {number} e - Index des Chickens
     * @param {Chicken} enemy - Chicken-Objekt
     */
    chickenDeath(e, enemy) {
        this.character.coins += 2;
        this.character.collectSound.play();
        this.coinAnimations.push(new CoinAnimation(this, enemy.x, enemy.y));
        this.level.enemies.splice(e, 1);
    }

    /**
     * Logik bei Tod des Endbosses.
     * @param {number} e - Index des Endbosses
     * @param {Endboss} enemy - Endboss-Objekt
     */
    endbossDeath(e, enemy) {
        this.character.coins += 5;
        this.character.collectSound.play();
        if (enemy.isDead()) {
            this.coinAnimations.push(new CoinAnimation(this, enemy.x, enemy.y));
            this.level.enemies.splice(e, 1);
            console.log("Endboss defeated");
            win();
            stopGame();
        }
    }

    /**
     * Zeichnet die Welt und ihre Objekte auf dem Canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0); // Kamera folgt dem Charakter, indem die ganze Welt verschoben wird

        this.addObjectsToMap(this.level.backgroundObjects);

        this.content();

        // Draw Funktion ruft sich selber erneut auf!!!!
        self = this; // Nur so kann man das this in der Funktion von requestAnimationFrame verwenden, da es sonst auf das Window Objekt zeigt
        this.animationFrame = requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Zeichnet alle Objekte und UI-Elemente auf dem Canvas.
     */
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

    /**
     * Fügt eine Liste von Objekten zur Karte hinzu.
     * @param {DrawableObject[]} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Zeichnet ein einzelnes Objekt auf das Canvas, ggf. gespiegelt.
     * @param {DrawableObject} mo 
     */
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

    /**
     * Spiegelt das Bild horizontal für Bewegungsrichtung.
     * @param {DrawableObject} mo 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Setzt die Spiegelung zurück.
     * @param {DrawableObject} mo 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}



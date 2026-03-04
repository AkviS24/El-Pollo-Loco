let canvas;
let world;
let keyboard = new Keyboard();
let sounds = [];
let masterVolume = 0.2;

function soundPushing() {
    sounds.push(world.gamestartSound);
    sounds.push(world.character.pups);
    sounds.push(world.character.throwing);
    sounds.push(world.character.damage);
    sounds.push(world.character.dead);
    sounds.push(world.character.hops);
    sounds.push(world.character.pups);
    sounds.push(world.character.move);
    sounds.push(world.character.collectSound);
    sounds.forEach((element) => element.volume = masterVolume);
}
function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    world.level = createLevel1();
    world.gamestartSound.play();
    soundPushing();
}

function mute() {
    if (sounds[0].muted) {
        sounds.forEach((s)=> s.muted = false);
    } else {
        sounds.forEach((s)=> s.muted = true);
    }
}

function newstartGame() {
    document.getElementById("winner-info").classList.add("winner-info");
    document.getElementById("winner-info").classList.remove("winner-info-visible");
    document.getElementById("win-screen").classList.add("win-screen");
    document.getElementById("win-screen").classList.remove("win-screen-visible");
    restartGame();
}

function winnerInfo() {
    document.getElementById("winner-info").classList.add("winner-info-visible");
    document.getElementById("winner-info").classList.remove("winner-info");
}

function win() {
    document.getElementById("win-screen").classList.add("win-screen-visible");
    document.getElementById("win-screen").classList.remove("win-screen");
    setTimeout(winnerInfo, 5000);
}

function createLevel1() {
    return new Level(
        [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],
    [
        new Cloud(),
    ],
    [
        new BackgroundObjects("./img/5_background/layers/air.png", -720),
        new BackgroundObjects("./img/5_background/layers/3_third_layer/2.png", -720),
        new BackgroundObjects("./img/5_background/layers/2_second_layer/2.png", -720),
        new BackgroundObjects("./img/5_background/layers/1_first_layer/2.png", -720),

        new BackgroundObjects("./img/5_background/layers/air.png", 0),
        new BackgroundObjects("./img/5_background/layers/3_third_layer/1.png", 0),
        new BackgroundObjects("./img/5_background/layers/2_second_layer/1.png", 0),
        new BackgroundObjects("./img/5_background/layers/1_first_layer/1.png", 0),

        new BackgroundObjects("./img/5_background/layers/air.png", 719),
        new BackgroundObjects("./img/5_background/layers/3_third_layer/2.png", 719),
        new BackgroundObjects("./img/5_background/layers/2_second_layer/2.png", 719),
        new BackgroundObjects("./img/5_background/layers/1_first_layer/2.png", 719),

        new BackgroundObjects("./img/5_background/layers/air.png", 719 * 2),
        new BackgroundObjects("./img/5_background/layers/3_third_layer/1.png", 719 * 2),
        new BackgroundObjects("./img/5_background/layers/2_second_layer/1.png", 719 * 2),
        new BackgroundObjects("./img/5_background/layers/1_first_layer/1.png", 719 * 2)
    ]
    );
}

function restartGame() {
    stopGame();
    sounds = [];
    world = null;
    level1 = createLevel1();
    document.getElementById("death-screen").classList.remove("death-screen-visible");
    document.getElementById("death-screen").classList.add("death-screen");
    init();
}

function deathScreen() {
    document.getElementById("death-screen").classList.add("death-screen-visible");
    document.getElementById("death-screen").classList.remove("death-screen");
}

function help() {
    document.getElementById("help-menu").classList.add("help-menu-visible");
    document.getElementById("help-menu").classList.remove("help-menu");
    pauseGame();
}

function backToGame() {
    document.getElementById("help-menu").classList.remove("help-menu-visible");
    document.getElementById("help-menu").classList.add("help-menu");
    resumeGame();
}

function stopGame() {
    cancelAnimationFrame(world.animationFrame);
    world.intervals.forEach(element => {
        clearInterval(element);
    });
}

function pauseGame() {
    world.intervals.forEach(element => {
        clearInterval(element);
    });
    world.paused = true;
}

function resumeGame() {
    if (!world.paused) return; // already running

    // reset the tracking array so we don't duplicate IDs
    world.intervals = [];

    // restart recurring logic
    world.run();
    world.character.animate();
    world.character.applyGravity();

    // make sure all existing enemies/objects animate again
    world.level.enemies.forEach(e => {
        if (typeof e.animate === 'function') e.animate();
    });
    world.throwableObjects.forEach(o => {
        if (typeof o.animate === 'function') o.animate();
    });
    world.coinAnimations.forEach(c => {
        if (typeof c.animate === 'function') c.animate();
    });

    world.paused = false;
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 65 || e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 68 || e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 87 || e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 83 || e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 70) {
        keyboard.F = true;
    }
    if (e.keyCode == 86) {
        keyboard.V = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 65 || e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 68 || e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 87 || e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 83 || e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 70) {
        keyboard.F = false;
    }
    if (e.keyCode == 86) {
        keyboard.V = false;
    }
});
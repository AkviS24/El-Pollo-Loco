let canvas;
let world;
let keyboard = new Keyboard();
let sounds = [];

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
    console.log(sounds);
}

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    world.gamestartSound.play();
    console.log('My Character is: ', world.character);
    soundPushing();
}

function mute() {
    if (sounds[0].muted) {
        sounds.forEach((s)=> s.muted = false);
    } else {
        sounds.forEach((s)=> s.muted = true);
    }
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
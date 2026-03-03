let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    
    console.log('My Character is: ', world.character);
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
    if(e.keyCode == 65 || e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if(e.keyCode == 68 || e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if(e.keyCode == 87 || e.keyCode == 38) {
        keyboard.UP = true;
    }
    if(e.keyCode == 83 || e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if(e.keyCode == 70) {
        keyboard.F = true;
    }
    if(e.keyCode == 86) {
        keyboard.V = true;
    }
});

window.addEventListener("keyup", (e) => {
    if(e.keyCode == 65 || e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if(e.keyCode == 68 || e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 87 || e.keyCode == 38) {
        keyboard.UP = false;
    }
    if(e.keyCode == 83 || e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if(e.keyCode == 70) {
        keyboard.F = false;
    }
    if(e.keyCode == 86) {
        keyboard.V = false;
    }
});
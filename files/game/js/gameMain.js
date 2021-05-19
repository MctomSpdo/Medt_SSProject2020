/**************************************************************************************************
 * MEDT - SSProject 2020
 * Author: Thomas Spindler
 * Project: Medientechnik Sommersemesterprojekt 2020 (Mars)
 * HTL Leonding -> 2 BHTIM
 * 
 * Page: Game | Mars 2020
 * Descripton: This is the Main JS of the Mars game.
 * Libs:
 * Tec used: 
 **************************************************************************************************/
let DEBUG = true;
let KEYLOG = false;
let loops = 0;
let keys = new Array(120, Boolean);
let PAUSED = false;

let surface = document.getElementById('surface');
let sprite = document.getElementById('sprite');
let spriteImg = document.getElementById('spriteImg');

init();
function init() {
    gameLoop();
}

function gameLoop() {
    if (!PAUSED) {
        loops++;
    }
    setTimeout(gameLoop, 100);
}

/*
 * EVENTS
 */

document.onkeydown = keyListenerDown;
document.onkeyup = keyListenerUp;

function keyListenerDown(e) {
    if (!e) {
        e = window.event; //Internet Explorer
    }
    if (e.keyCode >= 0 && e.keyCode <= 120) {
        keys[e.keyCode] = true;
    }
    if (DEBUG && KEYLOG) {
        console.log(`[INFO][KeyDown]: Key ${e.keyCode} Down`);
    }
}

function keyListenerUp(e) {
    if (!e) {
        e = window.event; //Internet Explorer
    }
    if (e.keyCode >= 0 && e.keyCode <= 120) {
        keys[e.keyCode] = false;
    }
    if (DEBUG && KEYLOG) {
        console.log(`[INFO][KeyUp]: Key ${e.keyCode} Up`);
    }
}
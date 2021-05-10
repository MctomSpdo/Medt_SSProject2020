/**************************************************************************************************
 * MEDT - SSProject 2020
 * Author: Thomas Spindler
 * Project: Medientechnik Sommersemesterprojekt 2020 (Mars)
 * HTL Leonding -> 2 BHTIM
 * 
 * Page: Game | Mars 2020
 * Descripton: This is the Initializing Page of the Game, it redirects to the Main game Page
 * Libs:
 * Tec used: 
 **************************************************************************************************/
let PlayernameInput = document.getElementById("nameInput");

function readGameInits() {
    let playername = PlayernameInput.value;

    if (playername == "" || playername.length < 5) {
        alert("Playername must be at leat 5 characters long");
        return;
    }

    sessionStorage["MGame_PlayerName"] = playername;
    alert("Currently in Development!");

    window.location.href = "./gamePlay.html";
}

PlayernameInput.addEventListener("keypress", function (event) {
    if (event.charCode == 13) {
        readGameInits();
    }
}, false);
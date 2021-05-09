/*
*   Mars        Game - Mars Project
*   Author:     Thomas Spindler - HTL Leonding
*   Comment:    Init Phase of the Game
*/
let PlayernameInput = document.getElementById("nameInput");

function readGameInits() {
    let playername = PlayernameInput.value;

    if(playername == "" || playername.length < 5) {
        alert("Playername must be at leat 5 characters long");
        return;
    }

    sessionStorage["MGame_PlayerName"] = playername;
    alert("Currently in Development!");

    window.location.href="./gamePlay.html";
}

PlayernameInput.addEventListener("keypress", function (event) {
    if (event.charCode == 13) {
        readGameInits();
    }
}, false);
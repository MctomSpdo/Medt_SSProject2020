/**************************************************************************************************
 * MEDT - SSProject 2020
 * Author: Martin Huemer, Thomas Spindler
 * Project: Medientechnik Sommersemesterprojekt 2020 (Mars)
 * HTL Leonding -> 2 BHTIM
 * 
 * Page: *
 * Descripton: The Main JS Used on every page of the Project
 **************************************************************************************************/

let navMenu = document.getElementById("nav-menu");
let body = document.getElementById("body");

/*
 * MENU 
 */
if (sessionStorage["menuOpen"] == "true") {
    displayMenu();
}

function displayMenu() {
    navMenu.style.display = "block";
    body.classList.add("noscroll");
    sessionStorage["menuOpen"] = "true";
}

function unDisplayMenu() {
    navMenu.style.display = "none";
    body.classList.remove("noscroll");
    sessionStorage["menuOpen"] = "false";
}

let menuButtons = document.getElementById("nav-links").children;

/**
 * Add Hover events to the Nav to display the div below it
 */
function initMenu() {
    for (let i = 0; i < menuButtons.length; i++) {
        menuButtons[i].addEventListener('mouseover', () => {
            let childs = menuButtons[i].children;
            childs[1].style.display = "block";
        });

        menuButtons[i].addEventListener('mouseout', () => {
            let childs = menuButtons[i].children;
            childs[1].style.display = "none";
        });
    }
}
initMenu();
//https://wiki.selfhtml.org/wiki/JavaScript/DOM/Event/mouseover

/*
 * TOP BUTTON 
 */

let topButton = document.getElementById("Top-Button");

window.onscroll = () => {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        topButton.style.display = "flex";
    } else {
        topButton.style.display = "none";
    }
}
//https://www.w3schools.com/howto/howto_css_modal_images.asp
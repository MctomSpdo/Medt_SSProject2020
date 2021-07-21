/**************************************************************************************************
 * MARS 2020
 * Author: Mctom Spdo
 * Project: MARS 2020
 * 
 * Page: Exploring Mars
 * Descripton: This Js embeds and loads the Images of the Mars rovers
 * Tec used: Nasa Dev API
 **************************************************************************************************/

let NasaKey = "Ard5P1Gocb3XeAbaaquOzvp2W1eWPDMPYTAHqV5D";
let dataF;

let resultBox = document.getElementById("newestImg");
let expandButton = document.getElementById("expand");

let inputsol = document.getElementById("solinput");
let roverselect = document.getElementById("selectRover");
let loadButton = document.getElementById("inputbutton");

let fullscreenBox = document.getElementById("lib-fullscreen");
let fullscreenImage = document.getElementById("fullscreenImage");
let fullscreenText = document.getElementById("fullscreenText");

let expanded = false;
let numbercheck = new RegExp("^[0-9]+$");
let currentsol = 1;

inputsol.addEventListener("keypress", function (event) {
    if (event.charCode == 13) {
        event.preventDefault();
        dataInput(inputsol.value);
    }
}, false);

loadButton.addEventListener('click', () => {
    event.preventDefault();
    dataInput(inputsol.value);
}, false);

/**
 * Preperatrion for the request based on the day, or if input = "max" | "new" | "newest" it loads the newest Images
 * @param {*} sol sol to be requested
 * @returns null if input is invalid;
 */
function dataInput(sol) {
    let newinputs = ["newest", "max", "new"]
    let checksol = sol.toLowerCase();
    if(newinputs.includes(checksol)) {//get the newest Images from each rover
        newestData(roverselect.value);
        return;
    }
    let solnumber = parseInt(sol);
    if (solnumber < 0 || !numbercheck.test(sol)) {
        console.log("[INFO]: Invalid Sol input");
        return;
    }
    if (solnumber == currentsol + roverselect.value) {//reduce DataBase executeion (limit: 1000 / h)
        return;
    }
    loadData(sol, roverselect.value);
}

/**
 * get latest Value and then call loadData();
 */
function init() {
    newestData("perseverance");
}
init();

/**
 * Get the newest Images of the provided Rover
 * @param {String} rover Rover name
 */
function newestData(rover) {
    fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?name&api_key=${NasaKey}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            inputsol.value = data.photo_manifest.max_sol;
            loadData(data.photo_manifest.max_sol, rover);
        })
        .catch((error) => {
            console.log('[ERROR]: ', error);
        });
}

/**
 * loads the Images from the Rover with the help of the input parameters
 * @param {Number} sol Martian day
 * @param {String} rover Rover name
 */
function loadData(sol, rover) {
    let link = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${NasaKey}`
    fetch(link)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            generateLib(data);
        })
        .catch((error) => {
            console.log('[ERROR]: ', error);
        });
}

/**
 * Generates the Image DOM from the JSON data
 * @param {JSON} imgdata 
 * @returns the html in plain text
 */
function generateImg(imgdata) {
    return `<div>
            <img src="${imgdata.img_src}"
                alt="Nasa Image" onclick="toFullScreen(this);">
            <div>
                <p>Rover: ${imgdata.rover.name}</p>
                <p>Camera: ${imgdata.camera.full_name}</p>
                <p>Sol: ${imgdata.sol}</p>
                <p>Earth Date: ${imgdata.earth_date}</p>
            </div>
        </div>`
}

/**
 * Loads the Image into the fullscreen element
 * @param {HTMLElement} element Image clicked on
 */
function toFullScreen(element) {
    fullscreenImage.src = element.src;
    fullscreenText.innerHTML = element.parentElement.children[1].innerHTML;
    fullscreenDisplay(true);
}

/**
 * Generates the Image Library (DOM)
 * @param {JSON} data API Response
 */
function generateLib(data) {
    let box1 = "<div>";
    let box2 = "<div>";
    let box3 = "<div>";
    let current = 1;
    let length = data.photos.length;

    for (let i = 0; i < length; i++) {
        if (current == 1) {
            box1 += generateImg(data.photos[i]);
        }
        if (current == 2) {
            box2 += generateImg(data.photos[i]);
        }
        if (current == 3) {
            box3 += generateImg(data.photos[i]);
        }
        current++;
        if (current > 3) {
            current = 1;
        }
    }

    box1 += "</div>";
    box2 += "</div>";
    box3 += "</div>";

    resultBox.innerHTML = box1 + box2 + box3;
    currentsol = data.photos[0].sol + "" + data.photos[0].rover.name;
}

/**
 * Expands the Image gallery
 */
function expand() {
    if (expanded) {
        resultBox.style.maxHeight = "80vh";
    } else {
        resultBox.style.maxHeight = "99999999999999vh";
    }
    expanded = !expanded;
    expandButton.classList.toggle("rotate180");
}

/**
 * Hides or displays the Full screen Image
 * @param {Boolean} on true to display, false to hide
 */
function fullscreenDisplay(on) {
    if (!on) {
        fullscreenBox.style.display = "none";
    } else {
        fullscreenBox.style.display = "grid"
    }
}
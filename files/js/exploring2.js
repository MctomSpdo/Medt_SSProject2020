let NasaKey = "Ard5P1Gocb3XeAbaaquOzvp2W1eWPDMPYTAHqV5D";
let dataF;
let resultBox = document.getElementById("newestImg");
let fullscreen = document.getElementById("lib-fullscreen");
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

function dataInput(sol) {
    let solnumber = parseInt(sol);
    if(solnumber < 0 || !numbercheck.test(sol)) {
        console.log("[INFO]: Invalid Sol input");
        return;
    }
    if(solnumber == currentsol) {//reduce DataBase executeion (limit: 1000 / h)
        return;
    }
    loadData(sol, roverselect.value);
}

loadData(1, "perseverance");
function loadData(sol, rover) {
    let link = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${NasaKey}`
    fetch(link)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            generateLib(data);
            console.log(data);
        })
        .catch((error) => {
            console.log('[ERROR]: ', error);
        });
}

function generateImg(imgdata) {
    let html = `<div>
            <img src="${imgdata.img_src}"
                alt="Nasa Image" onclick="toFullScreen(this);">
            <div>
                <p>Rover: ${imgdata.rover.name}</p>
                <p>Camera: ${imgdata.camera.full_name}</p>
                <p>Sol: ${imgdata.sol}</p>
                <p>Earth Date: ${imgdata.earth_date}</p>
            </div>
        </div>`
        return html;
}

function toFullScreen(element) {
    fullscreenImage.src = element.src;
    fullscreenText.innerHTML = element.parentElement.children[1].innerHTML;
    fullscreenDisplay(true);
}

function generateLib(data) {
    let box1 = "<div>";
    let box2 = "<div>"; 
    let box3 = "<div>";
    let current = 1;
    let length = data.photos.length;

    for(let i = 0; i < length; i++) {
        if(current == 1) {
            box1 += generateImg(data.photos[i]);
        }
        if(current == 2) {
            box2 += generateImg(data.photos[i]);
        }
        if(current == 3) {
            box3 += generateImg(data.photos[i]);
        }
        current++;
        if(current > 3) {
            current = 1;
        }
    }

    box1 += "</div>";
    box2 += "</div>"; 
    box3 += "</div>";

    resultBox.innerHTML = box1 + box2 + box3;
    currentsol = data.photos[0].sol;
}

function expand() {
    if(expanded) {
        resultBox.style.maxHeight = "80vh";
        expandButton.children[0].style.transform = "rotate(180deg)";
    } else {
        resultBox.style.maxHeight = "99999999999999vh";
        expandButton.children[0].style.transform = "rotate(0deg)";
    }
    expanded = !expanded;
    expandButton.children[0].style.transform = "";
    
}

function fullscreenDisplay(on) {
    if(!on) {
        fullscreenBox.style.display = "none";
    } else {
        fullscreenBox.style.display = "grid"
    }
}
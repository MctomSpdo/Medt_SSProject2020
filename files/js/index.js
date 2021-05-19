/**************************************************************************************************
 * MEDT - SSProject 2020
 * Author: Thomas Spindler
 * Project: Medientechnik Sommersemesterprojekt 2020 (Mars)
 * HTL Leonding -> 2 BHTIM
 * 
 * Page: Index.html
 * Descripton: The Main JS Used on every page of the Project
 **************************************************************************************************/

let NasaKey = "Ard5P1Gocb3XeAbaaquOzvp2W1eWPDMPYTAHqV5D";//Nasa API Key (request under https://api.nasa.gov/.) (Uses: 1000 times / hour)
let PersWeather = `https://mars.nasa.gov/rss/api/?feed=weather&category=mars2020&feedtype=json&api_key=${NasaKey}`;
let season = document.getElementById("weather-season");
let weatherReport = document.getElementById("weatherReport");
let gesData;

let degC = true;

getPersWeather();
function getPersWeather() {
    fetch(PersWeather)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            parsePersWeather(data);
            gesData = data;
        })
        .catch((error) => {
            console.log('[ERROR]: ', error);
        });
}

function parsePersWeather(data) {
    let html = "";
    for (let i = 0; i < data.sols.length; i++) {
        let current = data.sols[i];
        html += `<div id="weatherData">
                <h2>Sol: ${current.sol}</h2>
                <p>Date: ${current.terrestrial_date}</p>
                <hr>
                <p>High: ${convert(current.max_temp)}</p>
                <p>Low: ${convert(current.min_temp)}</p>
                <p>Pressure: ${current.pressure} psi</p>
            </div>`
    }
    weatherReport.innerHTML = html;
}

function convert(fahrenheit) {
    if (degC) {
        return Math.round(degFtoDegC(fahrenheit) * 10) / 10 + ' °C'; //rounded °C values
    }
    return fahrenheit + ' °F';
}

function degFtoDegC(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}
let address = "https://mars.nasa.gov/rss/api/?feed=weather&category=mars2020&feedtype=json&api_key=Ard5P1Gocb3XeAbaaquOzvp2W1eWPDMPYTAHqV5D"
//The address is made with a OWN API key. This key should be only used for the MEDT SSProject Mars 2020.
//A new key can be requested at https://api.nasa.gov/.

function getData() {
    fetch(address)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log('[ERROR]: ', error);
        });
}
const wForm = document.querySelector(".wForm");
const cInput = document.querySelector(".cInput");
const wCard = document.querySelector(".wCard");
const apikey = "968a3a5adb43c609fd55f901f0b2780f";

wForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cInput.value;

    if(city){
        try{
            const weatherData = await getweatherData(city);
            displayweatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please Enter A City");
    }

});

async function getweatherData(city){
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`

    const response = await fetch(apiurl);

    if(!response.ok){
        throw new Error("Could not fetch Weather data");
    }

    return await response.json();
}
function displayweatherInfo(data){
    const {name: city,
            main: {temp, humidity},
            weather: [{description, id}]} = data;

    wCard.textContent = "";
    wCard.style.display = "flex";

    const cDisplay = document.createElement("h1");
    const tDisplay = document.createElement("p");
    const hDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const wEmoji = document.createElement("p");

    cDisplay.textContent = city;
    tDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    hDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    wEmoji.textContent = getweatherEmoji(id);

    cDisplay.classList.add("cDisplay");
    tDisplay.classList.add("tDisplay");
    hDisplay.classList.add("hDisplay");
    descDisplay.classList.add("descDisplay");
    wEmoji.classList.add("wEmoji");

    wCard.appendChild(cDisplay);
    wCard.appendChild(tDisplay);
    wCard.appendChild(hDisplay);
    wCard.appendChild(descDisplay);
    wCard.appendChild(wEmoji);
}

function getweatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "🌩";
        case (weatherId >= 300 && weatherId < 400):
            return "⛈";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧";
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫";
        case (weatherId === 800):
            return "🌞";
        case (weatherId >= 801 && weatherId < 810):
            return "☁";
        default:
            return "⁉"
    }
}

function displayError(message){

    const eDisplay = document.createElement("p");
    eDisplay.textContent = message;
    eDisplay.classList.add("eDisplay");

    wCard.textContent = "";
    wCard.style.display = "flex";
    wCard.appendChild(eDisplay);
}
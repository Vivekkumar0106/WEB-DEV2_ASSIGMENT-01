const api = "https://api.weatherapi.com/v1/current.json?key=a3e4c50a365943ef07e2251b8b52ae75&q=";



document.querySelector("form").addEventListener("submit", fetchapi);


async function fetchapi(e) {
    e.preventDefault();
    const city = document.getElementById("bar").value;
    const apikey = api + city
    
    try {
        const data = await fetch(apikey);
        const data2 = await data.json();
        console.log(data2);
        display(data2);
        hist(city);
        
    } catch (error) {
        console.log("error:", error);
        let info1 = document.createElement("div");
        info1.setAttribute("class", "infobar");
        info1.innerHTML =  `<p>City Not Found</p>`
        let info = document.getElementById("info");
        info.append(info1);

    }
};

function display(data) {

    let info = document.getElementById("info");
    info.innerHTML = ""

    let info1 = document.createElement("div");
    info1.setAttribute("class", "infobar");
    info1.innerHTML =  `<p>City</p> <p>${data.location.name}</p>`
    console.log(data.location.name);

    let info2 = document.createElement("div");
    info2.setAttribute("class", "infobar");
    info2.innerHTML =  `<p>Country</p> <p>${data.location.country}</p>`
    console.log(data.location.country);

    let info3 = document.createElement("div");
    info3.setAttribute("class", "infobar");
    info3.innerHTML =  `<p>Temp</p> <p>${data.current.temp_c}</p>`
    console.log(data.current.temp_c);

    let info4 = document.createElement("div");
    info4.setAttribute("class", "infobar");
    info4.innerHTML =  `<p>Feels Like</p> <p>${data.current.feelslike_c}</p>`
    console.log(data.current.feelslike_c);

    let info5 = document.createElement("div");
    info5.setAttribute("class", "infobar");
    info5.innerHTML =  `<p>Humidity</p> <p>${data.current.humidity}</p>`
    console.log(data.current.humidity);

    
    info.append(info1, info2, info3, info4, info5);
};

function hist(city) {
    const hist = document.getElementById("hist");
    let hist1 = document.createElement("span");
    hist1.setAttribute("class", "hist")
    hist1.innerHTML =  `${city}`;
    hist.append(hist1);

    hist1.addEventListener("click", () => {
        fetchcity(city);
    })

    let cities = JSON.parse(localStorage.getItem("cities")) || [];

    if (!cities.includes(city)) {
        cities.push(city);
        localStorage.setItem("cities", JSON.stringify(cities));
    }
};

async function fetchcity(city) {

    const apikey = api + city;

    const data = await fetch(apikey);
    const data2 = await data.json();

    display(data2);
}


window.addEventListener("DOMContentLoaded", loadHistory);

function loadHistory(){

    const cities = JSON.parse(localStorage.getItem("cities")) || [];
    const histDiv = document.getElementById("hist");

    cities.forEach(city => {

        let span = document.createElement("span");
        span.className = "hist";
        span.innerHTML = city;

        span.addEventListener("click", () => {
            fetchcity(city);
        });

        histDiv.append(span);

    });
}
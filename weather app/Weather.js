import {API_Key}  from "./constant.js";

document.addEventListener("DOMContentLoaded", () => {
  const city_input = document.getElementById("city-input");
  const bt = document.getElementById("bt");
  const wi = document.getElementById("wi");
  const er = document.getElementById("er");

  bt.addEventListener("click", async () => {
    const city = city_input.value.trim();
    if (!city) return;
    try {
      const weatherData = await fetchweatherData(city);
      displayData(weatherData);
    } catch (error) {
      showerror();
    }
  });

  async function fetchweatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    //console.log(response);
    const data = await response.json();
    return data;
  }

  function displayData(data) {
    console.log(data);
    const { main, name, weather } = data;

    wi.innerHTML = ` <h2 id="city">${name} </h2>
        <p id="temp"> Temperature:${main.temp}</p>
        <p id="desc" >Weather:${weather[0].description} </p>`;

    er.classList.add("hidden");
    wi.classList.remove("hidden");
  }
  function showerror() {
    er.classList.remove("hidden");
    wi.classList.add("hidden");
  }
});

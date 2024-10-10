import { getWeather, getIconLink } from "./weatherapi";

const domLogic = (function () {
  const titleDiv = document.querySelector(".title");
  const searchForm = document.querySelector(".search");
  const container = document.querySelector(".container");

  const createCard = (data, cardName) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const name = document.createElement("h2");
    name.classList.add("name");
    name.textContent = cardName;
    card.appendChild(name);

    const temperature = document.createElement("p");
    temperature.classList.add("temperature");
    temperature.textContent = `temperature: ${data.temp}°`;
    card.appendChild(temperature);

    const feelsLike = document.createElement("p");
    feelsLike.classList.add("feel");
    feelsLike.textContent = `feels like: ${data.feelslike}°`;
    card.appendChild(feelsLike);

    const conditions = document.createElement("p");
    conditions.classList.add("conditions");
    conditions.textContent = data.conditions;
    card.appendChild(conditions);

    const humidity = document.createElement("p");
    humidity.classList.add("humidity");
    humidity.textContent = `humidity: ${data.humidity}%`;
    card.appendChild(humidity);

    const icon = document.createElement("img");
    icon.classList.add("icon");
    icon.src = getIconLink(data.icon);
    card.appendChild(icon);

    return card;
  };

  const updateScreenData = (cityName = null) => {
    if (cityName) {
      cityName = cityName.trim();
      cityName = cityName[0].toUpperCase() + cityName.slice(1).toLowerCase();
      titleDiv.textContent = "The weather in " + cityName;
    } else {
      titleDiv.textContent = "The weather in your location";
    }
    getWeather(cityName)
      .then((data) => {
        console.log(data);
        container.appendChild(createCard(data.today, "Now"));
        container.appendChild(createCard(data.tomorrow, "Tomorrow"));
      })
      .catch((error) => console.log(error));
  };

  const searchedCity = (e) => {
    e.preventDefault();
    const cityName = searchForm.searchbar.value;
    console.log({ cityName });
    container.textContent = "";
    updateScreenData(cityName);
    searchForm.searchbar.value = "";
  };

  searchForm.addEventListener("submit", searchedCity);
  return { updateScreenData };
})();

export { domLogic };

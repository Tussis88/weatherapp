import { getWeather } from "./weatherapi";

const domLogic = (function () {
  const titleDiv = document.querySelector(".title");
  const searchForm = document.querySelector(".search");
  const container = document.querySelector(".container");

  const createCard = (data) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const temperature = document.createElement("div");
    temperature.classList.add("temperature");
    temperature.textContent = data.temp;
    card.appendChild(temperature);

    const conditions = document.createElement("div");
    conditions.classList.add("conditions");
    conditions.textContent = data.conditions;
    card.appendChild(conditions);

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
        container.appendChild(createCard(data.today));
        container.appendChild(createCard(data.tomorrow));
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

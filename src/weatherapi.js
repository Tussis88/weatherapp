async function getWeather(city) {
  if (!city) {
    const coordinates = await geoLocator();
    console.log(coordinates);
    city = `${coordinates.latitude},${coordinates.longitude}`;
  }
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today/tomorrow?`;
  const params = new URLSearchParams({
    unitGroup: "metric",
    include: "current",
    key: "MJJ92JUR3TGCYFZMRV9NM92F8",
    contentType: "json",
  });

  try {
    const response = await fetch(url + params, { mode: "cors" });
    const data = await response.json();
    return {
      location: data.address,
      today: data.currentConditions,
      tomorrow: data.days[1],
    };
  } catch (error) {
    alert(error);
    return null;
  }
  // console.log({ data });
}

function geoLocator() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position);
      const lat = position.coords.latitude.toFixed(4);
      const long = position.coords.longitude.toFixed(4);
      console.log({ lat, long });
      resolve({
        latitude: lat,
        longitude: long,
      });
    }),
      (error) => reject(console.log(error));
  });
}

function getIconLink(icon) {
  // https://openweathermap.org/weather-conditions
  let conditionLink = "";
  switch (icon) {
    case "snow":
      conditionLink = "13d";
      break;
    case "rain":
      conditionLink = "09d";
      break;
    case "fog":
      conditionLink = "50d";
      break;
    case "wind":
      conditionLink = "03d";
      break;
    case "cloudy":
      conditionLink = "04d";
      break;
    case "partly-cloudy-day":
      conditionLink = "02d";
      break;
    case "partly-cloudy-night":
      conditionLink = "02n";
      break;
    case "clear-day":
      conditionLink = "01d";
      break;
    case "clear-night":
      conditionLink = "01n";
      break;
    default:
      console.log("no match found");
      return
  }
  return `https://openweathermap.org/img/wn/${conditionLink}@4x.png`;
}

export { getWeather, getIconLink };

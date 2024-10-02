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

  const response = await fetch(url + params, { mode: "cors" });
  const data = await response.json();
  console.log(data);
  return {
    location: data.address,
    today: data.days[0],
    tomorrow: data.days[1],
  };
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
export { getWeather };

async function getWeather() {
  const coordinates = await geoLocator();
  const url =
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${coordinates.latitude},${coordinates.longitude}/today/tomorrow?`;
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

async function geoLocator() {
  let lat;
  let long;
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position);
      lat = position.coords.latitude.toFixed(4);
      long = position.coords.longitude.toFixed(4);
      console.log({ lat });
      console.log({ long });
      return {
        latitude: lat,
        longitude: long,
      };
    });
  } else {
    console.log("no position");
  }
}

export { getWeather };

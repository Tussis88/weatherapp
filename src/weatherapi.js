async function getWeather() {
  const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/gorizia?"
  const params = new URLSearchParams({
    "unitGroup": "metric",
    "include": "current",
    "key": "MJJ92JUR3TGCYFZMRV9NM92F8",
    "contentType": "json",
  });

  const response = await fetch(url + params, { mode: "cors" });
  const data = await response.json();
  console.log(data);
}

export { getWeather }

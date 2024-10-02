import "./styles.css";
import { getWeather } from "./weatherapi";

getWeather()
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

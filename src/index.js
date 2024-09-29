import "./styles.css";
import { getWeather } from "./weatherapi";

getWeather().catch((error) => console.log(error));

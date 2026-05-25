import * as dotenv from 'dotenv';
import { LocationData, WeatherData }  from '../interfaces';

dotenv.config();

const apiKeyOpenWeather = process.env.API_KEY_OPENWEATHER;
const units = "imperial";

export async function getLatLonByZip(zip_code: number) {
    const url = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip_code}&appid=${apiKeyOpenWeather}`;
  
    try {
        const response = await fetch (url);

        if (!response.ok) {
            console.error(`API error: $ ${response.status}`);
            return
        }

        const data = await response.json() as LocationData;
        return data;
    } catch (error) {
        console.error('Network error:', error);
    }
}

export async function getLatLonByCity(city: string) {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKeyOpenWeather}`;
  
    try {
        const response = await fetch (url);

        if (!response.ok) {
            console.error(`API error: $ ${response.status}`);
            return
        }

        const data = await response.json() as LocationData[];
        return data[0];
    } catch (error) {
        console.error('Network error:', error);
    }
}

export async function getCurrentWeatherByZip(zip_code: number): Promise<WeatherData | undefined> {
    const locationData = await getLatLonByZip(zip_code);

    if (locationData) {
        const { lat, lon } = locationData;

        const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKeyOpenWeather}`;

        try {
            const response = await fetch (url);

            if (!response.ok) {
                console.error(`API error: $ ${response.status}`);
                return
            }

            const data = await response.json() as WeatherData;
            return data;
        } catch (error) {
            console.error('Network error:', error);
        }
    }
}


export async function getCurrentWeatherByCity(city: string): Promise<WeatherData | undefined> {
    const locationData = await getLatLonByCity(city);

    if (locationData) {
        const { lat, lon } = locationData;

        const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKeyOpenWeather}`;

        try {
            const response = await fetch (url);

            if (!response.ok) {
                console.error(`API error: $ ${response.status}`);
                return
            }

            const data = await response.json() as WeatherData;
            return data;
        } catch (error) {
            console.error('Network error:', error);
        }
    }
}
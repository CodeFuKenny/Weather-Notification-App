import { LocationData, WeatherData }  from '../interfaces';


export function unixToReadableTime(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleString();
}

export function formatWeatherDescription(weather: Array<{ main: string; description: string }>): string {
    return weather.map(w => `${w.main} - ${w.description}`).join(', ');
}

export function formatMessage(
    weatherData: WeatherData, 
    commute_data: any, 
    locationName: string,
    origin: string,
    dest: string
): string {
    const time = unixToReadableTime(weatherData.current.dt);
    const temperature = weatherData.current.temp;
    const wind_speed = weatherData.current.wind_speed
    const weather = weatherData.current.weather[0].description

    const distance = commute_data.distance;
    const duration = commute_data.duration;

    const message =`
==============================
Weather data for ${locationName}:
==============================
The current time is ${time}.
The temperature is : ${temperature}°F.
The wind speed is ${wind_speed} mph.
The weather is ${weather}.
==============================
Commute data from ${origin} to ${dest}:
==============================
Work is ${distance} away.
It will take ${duration} to get there.
==============================`.trim();

    return message
}
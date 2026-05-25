import { LocationData, WeatherData, Config }  from '../interfaces';


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

The current time is ${time}.

=========================================
==============Weather data===============
=========================================
Location: ${locationName}.
The temperature is : ${temperature}°F.
The wind speed is ${wind_speed} mph.
The weather is ${weather}.

=========================================
==============Commute data:==============
=========================================
From: ${origin} 
To: ${dest}
Total Distance: ${distance}.
Trip Time: ${duration}.`

    return message
}


// export function getSearchType(): SearchType {
//     const val = process.env.SEARCHTYPE;
//     if (val !== 'city' && val !== 'zip') {
//         throw new Error(`Invalid SEARCHTYPE: "${val}". Must be 'city' or 'zip'.`);
//     }
//     return val;
// }

export function getEnvVar(key: string): string {
    const value = process.env[key];
    if (!value) throw new Error(`Missing environment variable: ${key}`);
    return value;
}

export function buildConfig(): Config {
    const searchType = getEnvVar('SEARCHTYPE');
    
    if (searchType !== 'city' && searchType !== 'zip') {
        throw new Error(`Invalid SEARCHTYPE: "${searchType}". Must be 'city' or 'zip'.`);
    }

    const shared = {
        origin: getEnvVar('ORIGIN'),
        dest: getEnvVar('DESTINATION'),
        notificationMethod: getEnvVar('NOTIFICATIONMETHOD'),
    };

    if (searchType === 'city') {
        return { searchType, cityName: getEnvVar('CITY'), ...shared };
    } else {
        return { searchType, zipCode: parseInt(getEnvVar('ZIPCODE')), ...shared };
    }
}
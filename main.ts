import * as dotenv from 'dotenv';
import { getCommuteTime } from './services/commute';
import { getCurrentWeatherByZip, getCurrentWeatherByCity } from './services/weather';
import { formatMessage, buildConfig } from './utils/helpers';
import { sendTwilioMessage, sendDiscordMessage } from './services/message';
import { WeatherData, Config} from './interfaces';
dotenv.config()

const config: Config = buildConfig();

// Get weather by city or zip code
async function getWeather(config: Config): Promise<WeatherData | undefined> {
    if (config.searchType === 'city') {
        return await getCurrentWeatherByCity(config.cityName);
    } else if (config.searchType === 'zip') {
        return await getCurrentWeatherByZip(config.zipCode);
    }
}


async function main() {
    try {
        const weatherData = await getWeather(config);

        if (!weatherData) {
            console.error('Failed to get weather data');
            return
        }

        const commuteData = await getCommuteTime(config.origin,config.dest);

        if (!commuteData) {
            console.error('Failed to get commute data');
            return
        }

        const locationName = config.searchType === 'city' ? config.cityName : `Zip: ${config.zipCode}`;
        const message = formatMessage(weatherData, commuteData, locationName, config.origin, config.dest)

        if (config.notificationMethod === 'discord') {
            await sendDiscordMessage(message);
        } else if (config.notificationMethod === "twilio") {
            await sendTwilioMessage(message);
        }

    } catch (error) {
        console.error(`Error in main:`, error);
    }
}

main();
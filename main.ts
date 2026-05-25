import * as dotenv from 'dotenv';
import { getCommuteTime } from './services/commute';
import { getCurrentWeatherByZip, getCurrentWeatherByCity } from './services/weather';
import { unixToReadableTime, formatMessage } from './utils/helpers';
import { sendTwilioMessage, sendDiscordMessage } from './services/message';
import { WeatherData } from './interfaces';
import { send } from 'node:process';
dotenv.config()

const config = {
    searchType: 'city' as const, // city or zip
    cityName: 'Alexandria, VA, US',
    zipCode: 22304,
    origin: "5750 Dow Ave, Alexandria, VA, 22304",
    dest: "3050 Chain Bridge Rd, Fairfax, VA 22030",
    notificationMethod: "discord" // discord or twilio
}

// Get weather by city or zip code
async function getWeather(searchType: 'city' | 'zip', value: string | number): Promise<WeatherData | undefined> {
    if (searchType === 'city') {
        return await getCurrentWeatherByCity(value as string);
    } else if (searchType === 'zip') {
        return await getCurrentWeatherByZip(value as number);
    }
}


async function main() {

    try {

        const weatherData = await getWeather(config.searchType,
            config.searchType === 'city' ? config.cityName : config.zipCode
        );

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

        console.log(message);

    } catch (error) {
        console.error(`Error in main:`, error);
    }
}

main()
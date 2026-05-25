import * as dotenv from 'dotenv';
import { getEnvVar } from '../utils/helpers';

dotenv.config()

const apiKeyGoogleMaps = getEnvVar(`API_KEY_GMAPS`);

export async function getCommuteTime(origin: string, destination: string) {
    const url = `https://routes.googleapis.com/directions/v2:computeRoutes`;

    const body = {
        origin: {
            address: origin
        },
        destination: {
            address: destination
        },
        travelMode: "DRIVE",
        routingPreference: "TRAFFIC_AWARE",
        units: "IMPERIAL"
    }
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKeyGoogleMaps,
                'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.travelAdvisory.speedReadingIntervals'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            console.error(`Maps API error: $ ${response.status}`);
            return
        }

        const data = await response.json() as any;

        if (!data.routes || data.routes.length === 0) {
            console.error('Route not found');
            return
        }

        const route = data.routes[0];

        const distanceMiles = (route.distanceMeters / 1609.344).toFixed(2);

        const durationSeconds = parseInt(route.duration.replace('s', ''));
        const durationMinutes = Math.round(durationSeconds / 60);
        const durationText = durationMinutes >= 60
            ? `${Math.floor(durationMinutes / 60 )} hours ${durationMinutes % 60} minutes`
            : `${durationMinutes} minutes`

        return {
            distance: `${distanceMiles} mi`,
            duration: `${durationText}`,
        };

    } catch (error) {
        console.error('Network error:', error);
    }
  }
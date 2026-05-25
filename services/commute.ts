import * as dotenv from 'dotenv';

dotenv.config()

const apiKeyGoogleMaps = process.env.API_KEY_GMAPS;

export async function getCommuteTime(origin: string, destination: string) {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination}&origins=${origin}&units=imperial&key=${apiKeyGoogleMaps}`;
    
    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Maps API error: $ ${response.status}`);
            return
        }

        const data = await response.json() as any;
        const element = data.rows[0].elements[0];

        if (element.status !== 'OK') {
            console.error('Route not found');
            return;
        }

        return {
            distance: element.distance.text,
            duration: element.duration.text,
            trafficDuration: element.duration_in_traffic?.text
        };

    } catch (error) {
        console.error('Network error:', error);
    }
  }

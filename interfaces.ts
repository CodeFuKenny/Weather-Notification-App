// Weather Interfaces
export interface LocationData {
    zip: string;
    name: string;
    lat: number;
    lon: number;
    country: string;
}

export interface WeatherData {
    current: {
        dt: number;
        temp: number;
        feels_like: number;
        humidity: number;
        wind_speed: number;
        weather: Array<{ main: string; description: string }>;
    };
}

// Notification interfaces
export interface NotificationMessage {
    location: string;
    temperature: number;
    weatherCondition: string;
    commuteDuration: string;
    trafficDuration?: string;
}

export type Config = 
    | { cityName: string; origin: string; dest: string; notificationMethod: string; searchType: 'city'; }
    | { zipCode: number;  origin: string; dest: string; notificationMethod: string; searchType: 'zip'; }


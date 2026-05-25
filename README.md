# Morning Briefing Automator
A TypeScript-based CLI tool that orchestrates multiple API workflows to deliver a personalized morning summary. This project demonstrates API integration, asynchronous state management, and robust error handling in a type-safe environment.

## Key Features
- Weather Integration: Fetches real-time localized data via OpenWeatherMap API.
- Commute Analysis: Calculates travel times and traffic delays using Google Maps Distance Matrix.
- Automated Delivery: Formats and pushes data to Discord or via SMS using Twilio.
- Type Safety: Strict interface definitions for all external API contracts.

## Tech Stack
- Language: TypeScript
- Runtime: Node.js
- HTTP Client: Axios
- Environment Management: Dotenv
- Execution: ts-node

## PrerequisitesBefore you begin, ensure you have the following API keys:
- OpenWeatherMap: Get API Key
- Google Maps Platform: Enable Distance Matrix API
- Discord: Create an Webhook 

# Installation & Setup
1. Install dependencies: `npm install`
2. Configure environment variables:
Create a `.env` file with the following keys:
```
API_KEY_OPENWEATHER=your_key_here
API_KEY_GMAPS=your_key_here

GMAPS_SECRET=your_key_here

TWILIO_ACCOUNT_SID=your_key_here
TWILIO_AUTH_TOKEN=your_key_here
TWILIO_PHONE_NUMBER=your_key_here
TWILIO_TO_NUMBER=your_key_here

DISCORD_WEBHOOK=your_key_here
```
3. To run the script locally in development `npx node-ts .\main.ts`

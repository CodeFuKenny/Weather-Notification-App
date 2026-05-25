import * as dotenv from 'dotenv';
const twilio = require ("twilio")
import { getEnvVar } from '../utils/helpers';


dotenv.config()

export async function sendTwilioMessage(messagez: string) {
    const accountSid = getEnvVar('TWILIO_ACCOUNT_SID');
    const authToken = getEnvVar('TWILIO_AUTH_TOKEN');
    const fromNumber = getEnvVar('TWILIO_PHONE_NUMBER');
    const toNumber = getEnvVar('TWILIO_TO_NUMBER');

    const client = twilio(accountSid, authToken);

    try {
        const message = await client.messages.create({
            body: 'hello',
            from: `${fromNumber}`,
            to: toNumber,
        })

        console.log(message)

    } catch (error) {
        console.error('Network error:', error);
    }

}

export async function sendDiscordMessage(message: string) {
    const url = process.env.DISCORD_WEBHOOK;
    if (!url) {
        console.error('DISCORD_WEBHOOK not configured in .env');
        return;
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: message
            })
        })

        if (!response.ok) {
            console.error(`Discord API error: ${response.status}`);
            return;
        }
        console.log('Discord message sent successfully');
    } catch (error) {
        console.error('Network error:', error);
    }

}

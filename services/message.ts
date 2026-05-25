import * as dotenv from 'dotenv';
import { from } from 'node:stream/iter';
const twilio = require ("twilio")

dotenv.config()

export async function sendTwilioMessage(messagez: string) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;
    const toNumber = process.env.TWILIO_TO_NUMBER;

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

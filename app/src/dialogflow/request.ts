import fetch from 'node-fetch'
import { config } from '../config'
import {User} from "../modules/user/entity"

export const request = async (user: User, message: any) => {
    try {
        const res = await fetch('https://api.dialogflow.com/v1/query?v=20150910', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${config.DIALOGFLOW.CLIENT_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lang: 'en',
                query: message.text,
                sessionId: message.user,
                timezone: 'America/Los_Angeles'
            })
        })
        return await res.json()
    } catch (error) {
        console.error('DIALOGFLOW REQUEST ERROR: ', error)
    }
}

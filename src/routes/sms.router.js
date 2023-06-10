import { Router } from 'express';
import twilio from 'twilio';
import __dirname from '../utils.js';
const router  = Router();

const TWILIO_ACCOUNT_SID="AC931275ab0f76d09ed099b093f67239c9";
const TWILIO_TOKEN="b0447225e6b1046d9826d1a996e1cf60";
const TWILIO_SMS_NUMBER="+15856693206";

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_TOKEN);

router.get('/', async (req, res) => {
    let result = await client.messages.create({
        body: 'Hola, cómo estás?',
        from: TWILIO_SMS_NUMBER,
        to: '+541123903403'

    })
    res.send({
        status: "Success",
        result: "Mensaje enviado."
    })
})


export default router;
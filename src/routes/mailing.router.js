import { Router } from 'express';
import nodemailer from 'nodemailer';
import __dirname from '../utils.js';
import userModel from "../dao/models/user.model.js";
const router  = Router();

router.get('/:to', async (req, res) => {
    let user = await userModel.findOne({email: req.params.to})
    console.log(user);
    let result=await transport.sendMail({
        //from: req.params.from,
        from: 'kennyjosue8@gmail.com', // mail comercial 
        to: req.params.to,
        //to: 'kennyjosue8@gmail.com',
        subject: 'Envío de mail con nodemailer.',
        html: `
            <div>
                <h1>Bienvenido ${user.first_name}</h1>
                <br>
                <h3></h3>

                <img src="cid:meme"/>
            </div>
        `,
        attachments: [{
            filename: 'meme.jpg',
            path: __dirname + '/public/images/totoro.jpg',
            cid: 'meme'
        }]
    })
    res.send({status:"success", result: "Email enviado"})
});

//pasar esto como variable de entorno
const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth:{
        user:'kennyjosue8@gmail.com',
        pass:'iinxysgxpmrjxllk'
    }
});

export default router;
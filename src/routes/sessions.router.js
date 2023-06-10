import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";
import jwt from 'jsonwebtoken';
import {passportCall} from '../utils.js';

const router = Router();

router.post('/register', passport.authenticate('register', {session:false, passReqToCallback: true, failureRedirect:'failedRegister', failureMessage: true}),async(req,res)=>{
    
    res.send({
        status: "success",
        message: "User registered",
        payload: req.user._id,
      });
});

router.get("/failedRegister", (req, res) => {
    console.log(req.message);
    res.send ({status:"Failed"});
  });


router.get('/github', passport.authenticate('github', {scope: ['user:email']}, async(req, res)=>{}));

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async(req, res)=>{
    req.session.user = req.user;
    res.redirect('/products');
});


router.post('/login', passport.authenticate('login', {session:false, failureRedirect:'faillogin'}),async(req,res)=>{
    const { email, password } = req.body;

    req.session.user = {
        id: req.user._id,
        first_name : req.user.first_name,
        last_name : req.user.last_name,
        email: req.user.email,
        age : req.user.age,
        password:createHash(password),
        role: req.user.role,
        cart: req.user.cart
    }
    if (req.user.role === 'admin'){ 
        req.session.admin=true;
        return res.send({ status: "success", message: "logueado" });
    }

    //let token = jwt.sign({user}, 'coderSecret', {expiresIn:'24h'});
    res.send({ status: "success", payload: req.session.user });
    // return res.cookie('coderCookieToken', token, {maxAge:1000*60*24, httpOnly:true}).send({status:'Ok', message: 'Logged in successfully!', payload: user});
});

router.get('/faillogin', (req,res)=>{
    
    console.log("Fallo la estrategia");
    res.send ({status:"Failed"});
    
})

router.post('/resetPassword', async (req, res) => {
    const { email, password} = req.body;
    if (!email || !password) {
        return res.status(400).send({status: 'error', error: 'Valores incompletos.'});
    }
    //  Verificar password válido
    let existEmail = await userModel.find({email: email});
            if(existEmail){
                const user = await userModel.updateOne(
                    {email: email}, 
                    {$set:{password:createHash(password)}}
                );
                res.send({status:'Success', message:'Contraseña actualizada.'});
            };
    ///////  
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(!err) {
            res.render('login', {mensaje: 'Sesión cerrada.'})
        }else{
            res.send({status: "No pudo cerrar sesion", body:err});
        } 
    });
})

router.get('/current', passportCall('jwt'), (req,res)=>{
    res.send(req.user);
});
export default router;
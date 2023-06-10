import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/user.model.js";
import {createHash,isValidPassword} from '../utils.js';
import githubService from 'passport-github2';
import jwt from 'passport-jwt';
import Carts from '../dao/dbManagers/carts.js';

const cartManager = new Carts();

const LocalStrategy = local.Strategy;


const JWTStrategy = jwt.Strategy;//core de la estrategia de jwt
const ExtractJWT = jwt.ExtractJwt;// Extractor de jwt ya sea de headers, cookies, etc///
const initPassport =() =>
{

    passport.use('jwt', new JWTStrategy({
        
        jwtFromRequest:ExtractJWT.fromExtractors([cookieExtractor]), // Recibe la cookie y extrae el token
        secretOrKey:'coderSecret', //Corrobora que sea el mismo secret que en apps.js
    }, async(jwt_payload,done)=>{
        try {
            console.log('Cookie');
            console.log(jwt_payload);
            return done(null, jwt_payload);
        } catch (error) {
            return done(error);  
        }
    }));

    
    passport.use('login', new LocalStrategy({usernameField: 'email'}, async (username, password, done) =>{
        try {
            const user = await userModel.findOne({email: username})
            if(!user){
                console.log('User no existe')
                return done(null, false, {message: 'User not found'})
            }
            if(!isValidPassword(user, password)) return done(null, false, {message: 'Invalid password'})
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))

    passport.use('register', new LocalStrategy({passReqToCallback: true, usernameField: 'email'}, async (req, username, password, done )=>{
            const { first_name, last_name, email, age} = req.body;
            try {
                let user = await userModel.findOne({email: username})
                if(user){
                    console.log('User ya existe')
                    return done(null, false)
                }

                let newCart = await cartManager.postCarts();
                let role='';
                if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
                    role = 'admin';
                }else{
                    role = 'user';
                }

                const newUser = {
                    first_name, 
                    last_name, 
                    email, 
                    age,
                    password: createHash(password),
                    cart: newCart._id.toString(),
                    role:role
                }
                let result = await userModel.create(newUser)
                return done(null, result)
            } catch (error) {
                return done('Error al registrar el usuario: ' + error)
            }
        }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    });
    passport.deserializeUser(async(id,done)=>{
        let user = await userModel.findById(id);
        done(null,user);
    })


    passport.use('github', new githubService({
        clientID: "Iv1.40ec8ba414efaa03",
        clientSecret: "597288a2f3db38fedb9859869766a574f7c73b48",
        callbackURL: "http://localhost:8080/api/session/githubcallback"
    }, async (accessToken,refreshToken,profile, done)=>
    { try{
        let user = await userModel.findOne({email:profile._json.email});
        if(!user){
            let newUser = {
                first_name: profile._json.name,
                last_name: profile._json.name,
                email: profile._json.email,
                age:18,
                password:'prueba',
                role: profile._json.type
            }
            let result = await  userModel.create(newUser);
            done(null,result)
        }else{
            done(null,user)   
        }
    }catch(error){
        return done(error)
    }

    }))

}

export const cookieExtractor = req=>{
    let token = null;
    if( req && req.cookies){ //Comprobamos que hay cookies que extraer
        token=req.cookies['coderCookieToken'];// Estraemos la cookie que necesitamos.
        console.log("-------->"+token)
    }
    return token;
}

export default initPassport;
import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import mailingRouter from './routes/mailing.router.js';
import smsRouter from './routes/sms.router.js';
import mongoose  from 'mongoose';
import __dirname from '../src/utils.js';
import handlebars from 'express-handlebars';
import viewRouter from './routes/view.router.js';
import config from './public/js/config.js';
import MongoStore from 'connect-mongo';
import sessionsRouter from './routes/sessions.router.js';
import session from 'express-session';
import passport from "passport";
import initPassport from "./config/passport.config.js"
import cookieParser from 'cookie-parser';
import {passportCall} from './utils.js';
import usersRouter from "./routes/user.router.js";



const app = express();

// Conexión mongoose 
const connection = mongoose.connect(config.MONGOURL);



app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(`${__dirname}/public`));

app.use(express.json());

app.use(express.urlencoded({ extended:true }));

app.use(cookieParser());
initPassport();
app.use(session({
  secret:"SecretCoders",
  resave: false , 
saveUninitialized: true
}));

app.use(session({
  // ttl
  // retries
  // patch
  //store : new FileStorage({path:'./sessions', ttl:100, retries:0}), 
  store : MongoStore.create({
      mongoUrl: config.MONGOURL,
      mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
      ttl:120
  }),
  secret: "secretCode", 
  resave: false, 
  saveUninitialized: false,
  cookie: { sameSite: 'strict' }
}));

app.use(passport.initialize());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/session', sessionsRouter);
app.use('/api/users',usersRouter);
app.use('/',viewRouter);
app.use('/mail', mailingRouter);
app.use('/sms', smsRouter);
const httpServer = app.listen(config.PORT, ()=>console.log('Listening on port ' + config.PORT));






import dotenv from 'dotenv';

dotenv.config();

// const environment = "DEVELOPMENT";

/* dotenv.config({
    path:environment==="DEVELOPMENT"?'../../.env.development':'../../.env.production'
}); */

export default{
    MONGOURL: process.env.MONGODB_URI,
    PORT:process.env.PORT
} 
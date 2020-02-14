const LocalStrategy = require('passport-local'); // stategy to verify username and password
const JwtStrategy = require('passport-jwt').Strategy // strategy to verify access token
const ExtractJwt = require('passport-jwt'). ExtractJwt //helper to extract information from the token
const UserModel = require ('../models/users/index');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//handling serialiasation and deserialisation of the userModel
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

//Json Web Token 
const jwtOpts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_PASSWORD
}

passport.use(new LocalStrategy(UserModel.authenticate())), // this will check the req.body for username and password and verify

passport.use( new JwtStrategy(jwtOpts,(jwtPayload, callback)=>{
    UserModel.findById(jwtPayload._id, (err, user)=>{
        if (err) return callback(err,false) // Error in fetching info from db
        else if( user) return callback(null, user) //existing user, i.e. everything is good user exists 
        else return callback(null, false) //Non existing user

        //Asynchronous method #note: declare async in method if used
        // try {
        //     const user = UserModel.findById(jwtPayload._id)
        //     if(user)
        //         return callback (null, user)
        //     else return callback(null,false)
        // } catch (error) {
        //     return callback(error,false)
        // }
    })
})),
//create and export local strategy to verify username and password
module.exports = {
    getToken: (user) =>jwt.sign(user, jwtOpts.secretOrKey, { expiresIn: 3600})
}
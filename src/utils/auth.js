const LocalStrategy = require('passport-local'); // stategy to verify username and password
const UserModel = require ('../models/users/index');
const passport = require('passport');

//handling serialiasation and deserialisation of the userModel
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

//create and export local strategy to verify username and password
module.exports = {
    local: passport.use(new LocalStrategy(UserModel.authenticate())) // this will check the req.body for username and password and verify
}
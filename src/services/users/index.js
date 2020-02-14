const express = require('express');
const userRouter = express.Router();
const db = require('../../models/users/index');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {getToken} = require('../../utils/auth');

userRouter.get('/', async(req,res)=>{
    console.log('fetching');
})

//check the user credentials (username and password in body) and generate new token
userRouter.post('/signin',passport.authenticate('local') ,async(req,res)=>{
    //checks if credentials in req.body is valid
    // forge a new secure access token for user
    //save arbitrary info in the token
    // const randomToken = jwt.sign({username: req.user.username}, process.env.TOKEN_PASSWORD, {expiresIn: 3600}) #Example
    const token = getToken({_id: req.user._id, username: req.user.username, role: req.user.role})
    res.json({
        access_token: token,
        username: req.user,
        success: true,
        message: 'User successfully logged in '
    });
})

userRouter.post('/signup', async(req,res)=>{
    try {
        const newUser = await db.register(req.body, req.body.password);
        console.log(newUser);
        // res.json(newUser);
        const token = getToken({_id: newUser._id})
        res.json({
            access_token: token,
            user: newUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

//checks for user credentials (access token ) and generate a new token
userRouter.post('/refresh',passport.authenticate('jwt') ,async(req,res)=>{
    const token = getToken({_id: req.user._id})
    res.send({
        access_token: token,
        user: req.user
    })
})

userRouter.post('/verify', passport.authenticate('local'), async(req, res)=>{
    console.log('verifying');
    try{
        res.send(req.user)
    }catch(error){
        console.log(error)
    }
})
module.exports = userRouter;
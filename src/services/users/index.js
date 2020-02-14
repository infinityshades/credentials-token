const express = require('express');
const userRouter = express.Router();
const db = require('../../models/users/index');
const passport = require('passport');

userRouter.get('/', async(req,res)=>{
    console.log('fetching');
})

userRouter.post('/signup', async(req,res)=>{
    try {
        const newUser = await db.register(req.body, req.body.password);
        console.log(newUser);
        res.json(newUser);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
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
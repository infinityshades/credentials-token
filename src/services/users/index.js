const express = require('express');
const userRouter = express.Router();
const db = require('../../models/users/index');

userRouter.get('/', async(req,res)=>{
    console.log('fetching');
})


module.exports = userRouter;
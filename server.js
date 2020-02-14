const express = require('express');
const dotenv = require ('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
dotenv.config();

const userRouter = require('./src/services/users/index');

mongoose.connect(process.env.DB_URL,{useNewUrlParser:true})
.then(db => console.log('Connected to MongoDb'), err => console.log ('Failed to connect to mongodb', err))

app.use(cors());
app.use(express.json());
app.use('/users', userRouter);

const port = process.env.PORT || 4500
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})
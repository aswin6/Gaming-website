const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const createError = require('http-errors');
var session = require('express-session')
// const path = require('path');
// const { verifyAccessToken } = require('./helpers/jwt_helper')
const app = express();




// require 
require('dotenv').config();
require('./helpers/init_mongodb')  //mongoDB connection handler



//env variables
const PORT = process.env.PORT || 8887;




// app.use 

app.use(cors());
app.use(express.static('public'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({      //session creation
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

require('./controller/discord')

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Acess-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
    next();
});



// api 
const api = require('./routes/api')
app.use('/api',api)









//-------------HTTP Error Handling -------//

app.use(async (req, res, next) => {
    next(createError.NotFound('This route does not exist!!'));
})

app.use((err, req, res, next) => {
    console.log("error outside app.js", err,err.status,err.message)
    res.status(err.status || 500).send(err.message)
})




app.listen(PORT, () => {
    console.log(`.....SERVER started at ${PORT}`)
});
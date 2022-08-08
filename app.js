const express = require('express');
const app = express();
const path = require('path');

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
app.use(cors());


// for socket 
const http = require('http');
const server = http.Server(app);
const socketIO = require('socket.io');
const io = socketIO(server);


const createError = require('http-errors');
const session = require('express-session')
const passport = require('passport')
// const path = require('path');
// const { verifyAccessToken } = require('./helpers/jwt_helper')

app.use(express.static('public'));

// require 
require('dotenv').config();
require('./helpers/init_mongodb')  //mongoDB connection handler
require('./controller/bot')


//env variables
const PORT = process.env.PORT || 8887;




// app.use 
app.use(express.static(__dirname +'/FrontEnd/dist/FrontEnd'));

app.use(express.static('public'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({      //session creation
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use(passport.initialize())
app.use(passport.session())

require('./controller/discord')

// io.on('connection', (socket) => {
//     console.log('user connected');

//     socket.on('new-message', (message) => {
//         console.log(message);
//     });
// });



// api 
const api = require('./routes/api')
const dashboard1 = require('./routes/dashboard')
const forbidden = require('./routes/forbidden')


app.use('/api', api)
app.use('/forbidden', forbidden)
app.use('/dashboard1', dashboard1)











//-------------HTTP Error Handling -------//

// app.use(async (req, res, next) => {
//     next(createError.NotFound('This route does not exist!!'));
// })

// app.use((err, req, res, next) => {
//     console.log("error outside app.js", err, err.status, err.message)
//     res.status(err.status || 500).send(err.message)
// })




app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/FrontEnd/dist/FrontEnd/index.html'));
});





server.listen(PORT, () => {

    console.log(`.....SERVER started at ${PORT}`)
});


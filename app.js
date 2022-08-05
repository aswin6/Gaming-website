const express = require('express');
const app = express();
const path = require('path');



const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
app.use(cors());


// for socket 
let http = require('http');
let server = http.Server(app);
let socketIO = require('socket.io');
let io = socketIO(server);


const createError = require('http-errors');
var session = require('express-session')
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
    saveUninitialized: true,
    cookie: { secure: false }
}));

require('./controller/discord')

// io.on('connection', (socket) => {
//     console.log('user connected');

//     socket.on('new-message', (message) => {
//         console.log(message);
//     });
// });



// api 
const api = require('./routes/api')
app.use('/api', api)









//-------------HTTP Error Handling -------//

app.use(async (req, res, next) => {
    next(createError.NotFound('This route does not exist!!'));
})

app.use((err, req, res, next) => {
    console.log("error outside app.js", err, err.status, err.message)
    res.status(err.status || 500).send(err.message)
})




app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/FrontEnd/dist/FrontEnd/index.html'));
});





server.listen(PORT, () => {
    console.log(`.....SERVER started at ${PORT}`)
});


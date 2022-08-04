const express = require('express');
const router = express.Router()
const USERDATA = require('../model/userData');
const createError = require('http-errors')
const passport = require('passport')
const { generateOTP } = require('../helpers/otp-generator');
const nodemailer = require('nodemailer');

//email

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "ashin209@gmail.com",
        pass: "vippbflmysnszhro",
    },
});




//   api 
router.post('/signUp', async (req, res, next) => {

    try {




        const doesExist = await USERDATA.findOne({ email: req.body.email })
        if (doesExist) throw createError.Conflict(`${req.body.email} is already been registered`)

        console.log(req.body.email)
        // generate the otp
        var otp = Math.random();
        otp = otp * 1000000;
        otp = parseInt(otp);
        console.log(otp);

        // send mail with defined transport object
        var mailOptions = {
            to: req.body.email,
            subject: "Otp for registration is: ",
            html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            res.render('otp');
        });


        let item = {
            username: req.body.username,
            email: req.body.email,
            provider: 'mail',
            proPlayer: false,
            otp: otp
        }
        const USER = new USERDATA(item)
        const savedIdData = await USER.save()

        res.send({ email: savedIdData.email })
    }

    catch (error) {

        console.log("error1", error)
        next(error)
    }


})


router.post('/verifyOTP', async (req, res, next) => {


    try {
        let otp = req.body.data.otp
        let email = req.body.email

        const user = await USERDATA.findOne({
            email: email
        });
        if (!user) throw createError.Conflict(`${req.body.email} not found`)

        else if (user && user.otp !== otp) throw createError(401, 'Wrong OTP')
        else {
            console.log("Sucess")
            res.send(user).status(200)

        }
    } catch (error) {
        next(error)
    }




})








//discord
router.get('/discord', passport.authenticate('discord'), (req, res) => {
    res.send(200)
})

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => {
    res.send(200)
})

//google Save

router.post('/googleSave', async (req, res, next) => {

    try {

        console.log("entered", req.body)

        let item = {
            username: req.body.name,
            email: req.body.email,
            provider: req.body.provider,
            proPlayer: false,
        }

        const doesExist = await USERDATA.findOne({ email: item.email })
        if (doesExist) throw createError.Conflict(`${item.email} is already been registered`)


        const USER = new USERDATA(item)
        const savedIdData = await USER.save()

        res.send({ savedIdData })
    }

    catch (error) {

        console.log("error1", error)
        next(error)
    }


})


module.exports = router;

const express = require('express');
const router = express.Router()
const createError = require('http-errors')
const passport = require('passport')
const { generateOTP } = require('../helpers/otp-generator');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const USERDATA = require('../model/userData');
const fetch = require('node-fetch')


//email

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "ashin209@gmail.com",
        pass: "vippbflmysnszhro",
    },
});

//jwt
const { signAccessToken } = require('../helpers/jwt_helper')



//   api 
router.post('/signUp', async (req, res, next) => {

    try {

        // generate the otp
        var otp = Math.random();
        otp = otp * 1000000;
        otp = parseInt(otp);
        console.log(otp);

        let item = {
            email: req.body.email,
            provider: 'mail',
            proPlayer: false,
            superAdmin: false,
            otp: otp,
            discordID: 1002465326342094858
        }

        const doesExist = await USERDATA.findOne({ email: item.email })

        if (doesExist) {
            if (doesExist.provider != item.provider)
                throw createError.Conflict(`${item.email} is already been registered by ${doesExist.provider}. Use it to login`)
        }



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


        if (!doesExist) {
            const USER = new USERDATA(item)
            const savedIdData = await USER.save()

            res.send({ email: savedIdData.email })
        }
        else {

            let otpUpdate = { otp: otp }

            let updateData = { $set: otpUpdate };
            const savedData = await USERDATA.findByIdAndUpdate({ "_id": doesExist._id }, updateData)
            console.log("otp updated")
            res.send(savedData)

        }


    }



    catch (error) {

        console.log("Email error", error)
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

            let role = user.proPlayer ? 'professional' : 'normal';
            let superAdmin = user.superAdmin ? 'super' : 'normal'
            const accessToken = await signAccessToken(email, role, superAdmin)
            res.send({ accessToken })
            console.log("access token", accessToken)


        }
    } catch (error) {
        next(error)
    }




})








//discord

// router.get('/discordStart', passport.authenticate('discord'), (req,res) => {
//     request('http://localhost:8887/api/auth/discord',
//     function (error, response, body) {
//         console.log('entreed discord')
//         res.send(body)
//    });  
// })


router.get('/discord', passport.authenticate('discord'), (err) => {
    if (err) {
        console.log(err, 'errorrrr')
    }

})

router.get('/discord/redirect', passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: "/dashboard1"
}), (req, res) => {
    res.send(200) // Successful auth
});



//google Save

router.post('/googleSave', async (req, res, next) => {

    try {


        let item = {
            username: req.body.name,
            email: req.body.email,
            provider: req.body.provider,
            proPlayer: false,
            superAdmin: false
        }

        const doesExist = await USERDATA.findOne({ email: item.email })
        if (doesExist) {
            if (doesExist.provider != item.provider) throw createError.Conflict(`${item.email} is already been registered by ${doesExist.provider}. Use it to login`)

            let role = doesExist.proPlayer ? 'professional' : 'normal';
            let superAdmin = doesExist.superAdmin ? 'super' : 'normal'
            const accessToken = await signAccessToken(item.email, role, superAdmin)
            res.send({ accessToken })
            console.log("access token", accessToken)
        }

        else {
            const USER = new USERDATA(item)
            const savedIdData = await USER.save()
            console.log("saved data")
            res.send({ savedIdData })

        }

    }

    catch (error) {

        console.log("error1", error)
        next(error)
    }


})


module.exports = router;

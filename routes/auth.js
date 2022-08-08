const express = require('express');
const router = express.Router()
const createError = require('http-errors')
const passport = require('passport')
const nodemailer = require('nodemailer');
const USERDATA = require('../model/userData');

//jwt
const { signAccessToken } = require('../helpers/jwt_helper')
const { OTP_Mailer, Welcome_Mailer } = require('../controller/nodemailer')
const { generateOTP } = require('../helpers/otp-generator');


var newMailUserCheck = false;  //to check new user and send welcome message







//   api 
router.post('/signUp', async (req, res, next) => {

    try {

        const otp = generateOTP()

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


        const sendOTP = await OTP_Mailer(req.body.email, otp)
        console.log(sendOTP)


        if (!doesExist) {
            const USER = new USERDATA(item)
            const savedIdData = await USER.save()
            newMailUserCheck = true;
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

            if (newMailUserCheck) {
                const welcomeMessage = await Welcome_Mailer(email)
                newMailUserCheck = false
            }

            let role = user.proPlayer ? 'professional' : 'normal';
            let superAdmin = user.superAdmin ? 'super' : 'normal'
            const accessToken = await signAccessToken(email, role, superAdmin)
            res.send({ accessToken })


        }
    } catch (error) {
        next(error)
    }




})











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
            const welcomeMessage = await Welcome_Mailer(item.email)

            console.log("saved data",welcomeMessage)
            res.send({ savedIdData })

        }

    }

    catch (error) {

        console.log("error1", error)
        next(error)
    }


})


module.exports = router;

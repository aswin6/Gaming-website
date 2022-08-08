const express = require('express');
const router = express.Router()
const USERDATA = require('../model/userData');
const createError = require('http-errors')
const auth = require('./auth')
const jwt = require('jsonwebtoken');
const PartyData = require('../model/partyData')
const CoachData = require('../model/coachData')
const { botMessage } = require('../controller/bot')

const stripe = require('stripe')('sk_test_51LT4FJSBGyD7UYjVVOug1IelJFPempEWB9h8c2O260SlpUzWMrJ9vo8Av6iKDbrv8oVOeNm5QjL6fpgCVbnQBpav00CpBjJ2kJ');


router.use('/auth', auth)


//jwt

function verifyToken(req, res, next) {//token
    if (!req.headers.authorization) {
        return res.status(401).send('12Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('3Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('4Unauthorized request')
    } else if (req.body['auth']) {
        return res.status(200).send(payload)
    }
    req.userId = payload.subject

    next()
}

router.post('/stripe', async (req, res) => {

    try {
        console.log(req.body);
        token = req.body.token
        stripe.customers
            .create({
                email: "ashi@gmail.com",
                source: token.id
            })
            .then((customer) => {
                console.log(customer);
                return stripe.paymentIntents.create({
                    amount: 1000,
                    description: "Payment",
                    currency: "USD",
                    customer: customer.id,
                });
            })
            .then((charge) => {
                console.log(charge);
                res.json({
                    data: "success"
                })
            })
            .catch((err) => {
                console.log('err', err)
                res.json({
                    data: "failure",
                });
            });
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }



})


router.post('/reqPro', async (req, res) => {

    try {

        let email = req.body.email

        console.log(req.body, 'body')
        const user = await USERDATA.findOneAndUpdate(
            { "email": email },
            { "adminReq": true }
        )
        console.log("enter", user)
        res.send(user)
    } catch (error) {
        console.log(error)
    }



})


router.post('/coach', async (req, res) => {

    try {

        let item = {
            email: req.body.email,
            approve: false
        }


        const USER = new CoachData(item)
        const savedIdData = await USER.save()

        res.send(savedIdData)

    } catch (error) {
        console.log(error)
    }



})

router.get('/coach', async (req, res) => {
    try {

        const userLists = await CoachData.find()
        res.send(userLists)
    } catch (error) {
        console.log(error)
    }
})

router.get('/reqPro', async (req, res) => {
    try {
        const userLists = await USERDATA.find({ adminReq: true })
        res.send(userLists)
    } catch (error) {
        console.log(error)
    }
})


router.post('/party', async (req, res) => {
    try {

        let item = {
            game: req.body.data.game,
            email: req.body.email
        }
        console.log(req.body)
        const USER = new PartyData(item)
        const savedIdData = await USER.save()
        res.send(savedIdData)

    } catch (error) {
        console.log(error)
    }
})

router.get('/party', async (req, res) => {
    try {

        const userLists = await PartyData.find()
        res.send(userLists)
    } catch (error) {
        console.log(error)
    }
})

router.post('/sendlink_approve', async (req, res) => {
    let email = req.body.id
    const doesExist = await USERDATA.findOne({ email: email })

    const discordID = doesExist.discord_id
    const twitchID = doesExist.channel_name
    const discordMessage = botMessage(discordID,twitchID)


    res.send(discordMessage)


})


router.post('/joinparty', async (req, res) => {
    try {

        let email = req.body.id

        const doesExist = await USERDATA.findOne({ email: email })
        const twitchID = doesExist.channel_name
        // const binded = await USERDATA.aggregate([{

        //     $lookup: {
        //         from: "partydatas",
        //         localField: "email",
        //         foreignField: "email",
        //         as: "party_created"
        //     }
        // }])
        // let twitch = twitchID.channel_name

        res.send( {twitchID})
    } catch (error) {
        console.log(error)
    }
})


router.post('/user', async (req, res) => {
    try {

        let email = req.body.data
        console.log(req.body)
        const doesExist = await USERDATA.findOne({ email: email })
        res.send(doesExist)

    } catch (error) {
        console.log(error)

    }



})

router.get('/users', async (req, res) => {
    try {
        const userLists = await USERDATA.find()
        res.send(userLists)
    } catch (error) {
        console.log(error)
    }
})
module.exports = router;

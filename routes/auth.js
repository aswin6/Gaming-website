const express = require('express');
const router = express.Router()
const USERDATA = require('../model/userData');
const createError = require('http-errors')
const passport = require('passport')
const cors = require('cors')

//email
router.post('/signUp', async (req, res, next) => {

    try {

        console.log("entered", req.body)

        let item = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            provider:'manual',
            proPlayer: false,
        }

        const doesExist = await USERDATA.findOne({ email: item.email })
        if (doesExist) throw createError.Conflict(`${item.email} is already been registered`)


        const USER = new USERDATA(item)
        const savedIdData = await USER.save()

        res.send({ savedIdData })
    }

    catch (error) {

        console.log("error1",error)
        next(error)
    }


})

//discord
router.get('/discord',passport.authenticate('discord'),(req,res)=>{
    res.send(200)
})

router.get('/discord/redirect',passport.authenticate('discord'),(req,res)=>{
    res.send(200)
})

//google Save

router.post('/googleSave', async(req,res,next)=>{

    try {

        console.log("entered", req.body)

        let item = {
            username: req.body.name,
            email: req.body.email,
            provider:req.body.provider,
            proPlayer: false,
        }

        const doesExist = await USERDATA.findOne({ email: item.email })
        if (doesExist) throw createError.Conflict(`${item.email} is already been registered`)


        const USER = new USERDATA(item)
        const savedIdData = await USER.save()

        res.send({ savedIdData })
    }

    catch (error) {

        console.log("error1",error)
        next(error)
    }


})


module.exports = router;

const express = require('express');
const router = express.Router()
const USERDATA = require('../model/userData');
const createError = require('http-errors')


router.post('/signUp', async (req, res, next) => {

    try {

        console.log("entered", req.body)

        let item = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            proPlayer: false,
        }

        const doesExist = await USERDATA.findOne({ email: item.email })
        if (doesExist) throw createError.Conflict(`${item.email} is already been registered`)


        const USER = new USERDATA(item)
        const savedIdData = await USER.save()

        res.send({ savedIdData })
    }

    catch (error) {

        console.log(error)
        next(error)
    }


})




module.exports = router;

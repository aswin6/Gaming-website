const express = require('express');
const router = express.Router()
//jwt
const { signAccessToken } = require('../helpers/jwt_helper')

const isAuthorized = (req, res, next) => {


    if (req.user) {
        console.log("User is logged in")
        next()
    }
    else {
        console.log("User not logged in")
        res.redirect('/')
    }
}

router.get('/', isAuthorized, async (req, res) => {
    console.log(req.user)
    let role = req.user.proPlayer ? 'professional' : 'normal';
    let superAdmin = req.user.superAdmin ? 'super' : 'normal';
    let email = req.user.email
    const accessToken = await signAccessToken(email, role, superAdmin)
    console.log("access token", accessToken)
    res.cookie("access token", accessToken , { httpOnly: true });

    res.redirect(`/loading?token=${accessToken}`)
})

module.exports = router
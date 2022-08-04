const express = require('express');
const router = express.Router()
const USERDATA = require('../model/userData');
const createError = require('http-errors')
const auth = require('./auth')

const stripe = require('stripe')('sk_test_51LT4FJSBGyD7UYjVVOug1IelJFPempEWB9h8c2O260SlpUzWMrJ9vo8Av6iKDbrv8oVOeNm5QjL6fpgCVbnQBpav00CpBjJ2kJ');


router.use('/auth', auth)

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
                console.log('err',err)
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




module.exports = router;

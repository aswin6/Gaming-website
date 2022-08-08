const express = require('express');
const router = express.Router()

router.get('/', async (req, res) => {
    res.send("Forbidden. URL Error")
})

module.exports = router
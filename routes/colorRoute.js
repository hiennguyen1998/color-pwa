const colorCtrl = require('./../controllers/colorCtrl')
const express = require('express')
const router = express.Router()

router
    .route("/")
    .get(colorCtrl.getAll)


module.exports = router
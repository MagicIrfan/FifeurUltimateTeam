const express = require('express');
const router = express.Router();

const nationaliteCtrl = require('../controllers/nationalite');

router.get('/', nationaliteCtrl.getAllNationalities);
module.exports = router;
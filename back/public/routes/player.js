const express = require('express');
const router = express.Router();

const playerCtrl = require('../controllers/player');

router.get('/', playerCtrl.getPlayer);
module.exports = router;
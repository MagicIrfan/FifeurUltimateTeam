const express = require('express');
const router = express.Router();

const clubCtrl = require('../controllers/club');

router.get('/', clubCtrl.getAllClubs);
module.exports = router;
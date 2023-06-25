const express = require('express');
const router = express.Router();

const posteCtrl = require('../controllers/poste');

router.get('/', posteCtrl.getAllPosts);
module.exports = router;
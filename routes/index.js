const express = require('express');
const router = express.Router();

const symmetric = require('../controllers/symmetric');
const asymmetric = require('../controllers/asymmetric');
const digSig = require('../controllers/digSig');

router.post('/symmetric/encrypt',symmetric.encrypt);
router.post('/symmetric/decrypt',symmetric.decrypt);

router.post('/asymmetric/encryptDecrypt',asymmetric.encryptDecrypt);

router.post('/digSig/sign',digSig.sign);
router.post('/digSig/verify',digSig.verify);

module.exports = router;
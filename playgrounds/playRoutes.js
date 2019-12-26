const router = require('express').Router();
const {playController} = require('./playcontroller');

router.get('/',playController);

module.exports = router;
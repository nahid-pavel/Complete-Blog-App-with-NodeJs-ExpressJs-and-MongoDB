const router = require('express').Router();

const {
   authorProfileGetControoller
} = require('../controllers/authorController');

router.get('/:userId',authorProfileGetControoller);


module.exports = router;



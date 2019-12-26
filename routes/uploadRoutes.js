const router = require('express').Router()

const {isAuthenticated}= require('../middlewares/authMiddlewares');
const upload= require('../middlewares/uploadMiddleware');
const {uploadProfilePics, 
    removeProfilePics,
    postImageUpload}= require('../controllers/uploadController');


router.post('/profilePics',isAuthenticated,upload.single('profilePics'),uploadProfilePics);
router.delete('/profilePics',isAuthenticated,removeProfilePics);
router.post('/postImage',isAuthenticated,upload.single('post-image'),postImageUpload)

module.exports = router;

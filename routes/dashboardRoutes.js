const router= require("express").Router();
const {getdashbordController,
       getCreateProfileController,
       postCreateProfileController,
       getEditProfileController,
       postEditProfileController,
       bookmarksGetController,
       commentsGetController} = require('../controllers/dashboardController');
const {isAuthenticated} = require('../middlewares/authMiddlewares');
const profileValidator = require('../validator/dashboard/dashboardValidator')

router.get('/bookmarks',isAuthenticated, bookmarksGetController );
router.get('/comments',isAuthenticated, commentsGetController );

router.get('/create-profile',isAuthenticated, getCreateProfileController);
router.post('/create-profile',isAuthenticated, profileValidator, postCreateProfileController);
router.get('/edit-profile',isAuthenticated,getEditProfileController);
router.post('/edit-profile',isAuthenticated, postEditProfileController);
router.get('/',isAuthenticated, getdashbordController );



module.exports = router;

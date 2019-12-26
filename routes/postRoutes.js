const router = require('express').Router()
const postValidator = require('../validator/post/postValidator')
const {isAuthenticated}= require('../middlewares/authMiddlewares');
const upload = require('../middlewares/uploadMiddleware');

const {
    createPostGetController,
    createPostPostController,
    editPostGetController,
    editPostPostController,
    postDeleteController,
    postsGetcontroller

}= require('../controllers/postController');

router.get('/create',isAuthenticated,createPostGetController);
router.post('/create',isAuthenticated, upload.single('post-thumbnail'),postValidator,createPostPostController);
router.get('/edit/:postId',isAuthenticated,editPostGetController);
router.post('/edit/:postId',isAuthenticated, upload.single('post-thumbnail'),postValidator,editPostPostController);
router.get('/delete/:postId',isAuthenticated, postDeleteController);
router.get('/',isAuthenticated,postsGetcontroller);



module.exports=router
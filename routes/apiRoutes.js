const router = require('express').Router();
const {isAuthenticated} = require('../middlewares/authMiddlewares');
const {
    commentPostController,
    replyCommentPostController
}= require('../controllers/commentPostController');

const {
    likesGetController,
    dislikesGetController
}=require('../controllers/likeDislikeController');

const { 
    bookmarksController
} = require('../controllers/bookmarksController');
 
router.post('/comments/:postId',isAuthenticated,commentPostController);

router.post('/comments/replies/:commentId',isAuthenticated,replyCommentPostController);

router.get('/likes/:postId',isAuthenticated,likesGetController);
router.get('/dislikes/:postId',isAuthenticated, dislikesGetController);
router.get('/bookmarks/:postId',isAuthenticated,bookmarksController)




module.exports = router;
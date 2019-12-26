const Flash = require("../utils/Flash");
const {
    validationResult
} = require("express-validator");
const errorFormatter = require("../utils/validationErrorFormatter");
const Post = require("../models/Post");
const Profile = require('../models/Profile');
const readingTime = require('reading-time');

exports.createPostGetController = (req, res, next) => {
    res.render("pages/dashboard/post/createPost", {
        title: "Create Post",
        error: {},
        flashMessage: Flash.getMessage(req),
        value: {}
    });
};
exports.createPostPostController = async (req, res, next) => {
    let {
        title,
        body,
        tags
    } = req.body;

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        console.log("our req", req.body);

        return res.render("pages/dashboard/post/createPost", {
            title: "Create Post",
            error: errors.mapped(),
            flashMessage: Flash.getMessage(req),
            value: {
                title,
                body,
                tags
            }
        });
    }

    if (tags) {
        tags = tags.split(',');
    }

    let readTime = readingTime(body).text

    let post = new Post({
        author:req.user._id,
        title,
        body,
        tags,
        readTime,
        thumbnail: '',
        likes: [],
        dislikes: [],
        comments: []
    });

    if (req.file) {
        console.log(req.file)
        post.thumbnail = `/uploads/${req.file.filename}`
    }

    try {

        let createdPost = await post.save();

        await Profile.findOneAndUpdate({
                user: req.user._id
            }, {
                $push: {
                    'posts': createdPost._id
                }
            }


        )

        req.flash('success','Post created successfully')
        return res.redirect(`/posts/edit/${createdPost._id}`)


    } catch (error) {
        next(error)

    }


};

exports.editPostGetController = async (req, res, next) => {

    let postId = req.params.postId;

    if(postId){
        console.log(`postId:${postId} and author;${req.user._id}`)
    }

    try {

        let post = await Post.findOne({author:req.user._id,_id:postId});
        if (!post) {
            
            let error = new Error('404 Page Not Found');
            console.log('error in post')
            error.status = 404;
            throw new err;

        }

        res.render("pages/dashboard/post/editPost", {
            title: "Edit Post",
            error: {},
            flashMessage: Flash.getMessage(req),
            post
        });


    } catch (error) {

        next(error)

    }




}

exports.editPostPostController = async (req, res, next) => {

    let {title,body,tags} = req.body;
    let postId = req.params.postId;
    let errors = validationResult(req).formatWith(errorFormatter);
    
    try {

        let post = await Post.findOne({author:req.user._id,_id:postId});
        if (!post) {
            
            let error = new Error('404 Page Not Found');
            error.status = 404;
            throw new err;

        }

        if (!errors.isEmpty()) {
                res.render("pages/dashboard/post/createPost", {
                title: "Create Post",
                error: errors.mapped(),
                flashMessage: Flash.getMessage(req),
                post
            });
        }

        if(tags){
            tags = tags.split(',')
            tags = tags.map(t=> t.trim())

        }

        let thumbnail = post.thumbnail;
        if(req.file){
            thumbnail= req.file.filename
        }

        await Post.findOneAndUpdate(
            {_id: post._id},
            {$set: {title,body,tags,thumbnail}},
            {new: true}


        )

        req.flash('success','Post updated successfully')
        res.redirect('/posts/edit/'+post._id)
    

    } catch (error) {

        next(error)

    }




}

exports.postDeleteController = async (req,res,next) =>{

    let postId = req.params.postId;



    try {
      
        let post = await Post.findOne({author:req.user._id,_id:postId});
        if (!post) {
            
            let error = new Error('404 Page Not Found');
            console.log('error in post')
            error.status = 404;
            throw new err;

        }

        await Post.findOneAndDelete({_id:postId})

        await Profile.findOneAndUpdate(

            {user:req.user._id},
            {$pull: {'posts': postId}}

            
        )

        req.flash('success','Post deleted successfully')
        res.redirect('/posts')
        
    } catch (error) {
        next(error)
        
    }

}

exports.postsGetcontroller = async(req,res,next)=>{
    try {

        let posts = await Post.find({author: req.user._id})
        res.render('pages/dashboard/post/posts',{
           title:'My Posts',
           posts,
           flashMessage: Flash.getMessage(req)

        })
        
    } catch (error) {
         next(error)
    }
}
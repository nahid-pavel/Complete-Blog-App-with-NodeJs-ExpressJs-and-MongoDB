const Post = require('../models/Post');
const Flash= require('../utils/Flash');

exports.searchResultGetController = async(req,res,next)=>{
    let term = req.query.term;
    let currentPage = parseInt(req.query.page) || 1;
    let itemsPerPage = 10;

    try {

        let posts = await Post.find(
            {$text: {$search: term}}
        ).skip((currentPage*itemsPerPage)-itemsPerPage)
        .limit(itemsPerPage)

        let totalPost = await Post.countDocuments({
            $text: {$search: term}
        })

        let totalPage = totalPost / itemsPerPage;

        res.render('pages/explorer/search',{
            title:`Result from ${term}`,
            flashMessage: Flash.getMessage(req),
            searchTerm: term,
            itemsPerPage,
            currentPage,
            totalPage,
            posts


        })

        
    } catch (error) {
        next(error)
    }
}
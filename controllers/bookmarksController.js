const Profile = require('../models/Profile');


exports.bookmarksController = async(req,res,next)=>{
    let {postId} = req.params;
    
    if(!req.user){
        return res.status(400).json({
            error: 'You are not an  authenticated user'
        })
    }

    let userId = req.user._id;
    let bookmark = null;

    try {

        let profile =await  Profile.findOne({user: userId})

        if(profile.bookmarks.includes(postId)){
            await profile.findOneAndUpdate(
                {user : userId},
                {$pull: {'bookmarks' : postId}}
            )

            bookmark = false;
        }else{

            await Profile.findOneAndUpdate(
                {user: userId},
                {$push: {'bookmarks': postId}}
            )
            bookmark = true;

        }
        res.status(200).json({
               bookmark
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Server error occured'
        })
        
    }

}


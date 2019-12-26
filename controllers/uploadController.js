const Profile = require("../models/Profile");
const User = require("../models/User");
const fs = require('fs');

exports.uploadProfilePics = async (req, res, next) => {
  if (req.file) {
    try {
     
     let oldProfilePics = req.user.profilePics;
     let profile = await Profile.findOne({
        user: req.user._id
      });
      let profilePics = `/uploads/${req.file.filename}`;
      if (profile) {
        await Profile.findOneAndUpdate({
          user: req.user._id},
          { $set: {
            profilePics
          }
         }
        );
      }

      await User.findOneAndUpdate({
        _id: req.user._id},
        {$set: {
          profilePics
        }

      });
      if(oldProfilePics !== '/uploads/default.png'){
        fs.unlink(`public${oldProfilePics}`,err=>{
          if(err) console.log(err)
        })
      }

      res.status(200).json({
        profilePics
      });
    } catch (err) {
      res.status(500).json({
        profilePics: req.user.profilePics
      });
    }
  } else {
    res.status(500).json({
      profilePics: req.user.profilePics
    });
  }
};
exports.removeProfilePics =(req, res, next) => {
  
    try {
     let defaultProfilePics = '/uploads/default.png';
     let currentProfilePics = req.user.profilePics;
     fs.unlink(`public${currentProfilePics}`,async ()=>{
      let profile = await Profile.findOne({
        user: req.user._id
      });
      
      if (profile) {
        await Profile.findOneAndUpdate({
          user: req.user._id},
          { $set: {
            profilePics: defaultProfilePics
          }
         }
        );
      }

      await User.findOneAndUpdate({
        _id: req.user._id},
        {$set: {
          profilePics: defaultProfilePics
        }

      });


     });
     res.status(200).json({
       profilePics: defaultProfilePics
    });
    }catch(err){
      console.log(err);
      res.status(500).json({
        message:'can not remove message'
      });

    }
  
  
}

exports.postImageUpload = (req,res,next)=>{
  if(req.file){
    return res.status(200).json({
      imgUrl: `/uploads/${req.file.filename}`
    })
  }

  return res.status(500).json({
    message: 'Server Error'
  })
}



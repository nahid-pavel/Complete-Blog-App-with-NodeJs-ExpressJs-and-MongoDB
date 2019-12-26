const Flash = require("../utils/Flash");
const Profile = require("../models/Profile");
const Comment = require("../models/Comment");
const User = require("../models/User");
const { validationResult } = require("express-validator");
const errorFormatter = require("../utils/validationErrorFormatter");

exports.getdashbordController = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id })
                                  .populate({
                                    path:'posts',
                                    select:'title thumbnail'
                                  })
                                  .populate({
                                     path:'bookmarks',
                                     select:'title thumbnail'
                                  })
    if (profile) {
      return res.render("pages/dashboard/dashboard", {
        title: "Welcome to Dashboard",
        flashMessage: Flash.getMessage(req),
        posts: profile.posts.reverse().slice(0,3),
        bookmarks: profile.bookmarks.reverse().slice(0,3)
      });
    }

    res.redirect("dashboard/create-profile");
  } catch (error) {
    next(error);
  }
};
exports.getCreateProfileController = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    if (profile) {
      return res.redirect("/dashboard/edit-profile");
    }
    console.log(req.user._id);
    res.render("pages/dashboard/create-profile", {
      title: "Create Profile",
      flashMessage: Flash.getMessage(req),
      error: {}
    });
  } catch (error) {
    next(error);
  }
};

exports.postCreateProfileController = async (req, res, next) => {
  let errors = validationResult(req).formatWith(errorFormatter);

  if (!errors.isEmpty()) {
    return res.render("pages/dashboard/create-profile", {
      title: "Create Profile",
      flashMessage: Flash.getMessage(req),
      error: errors.mapped()
    });
  }

  let {
    name,
    email,
    title,
    bio,
    website,
    facebook,
    twitter,
    github
  } = req.body;
  try {
    let profile = new Profile({
      user: req.user._id,
      name,
      email,
      title,
      bio,
      links: {
        website: website || "",
        facebook: facebook || "",
        twitter: twitter || "",
        github: github || ""
      },

      profilePics: req.user.profilePics,
      posts: [],
      bookmarks: []
    });

    let createdProfile = await profile.save();
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { profile: createdProfile._id } }
    );

    req.flash("success", "Profile Created Successfully");
    res.redirect("/dashboard");
  } catch (error) {
    next(error);
  }
};

exports.getEditProfileController = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
      return redirect("/dashboard/create-profile");
    }
    console.log(profile);
    res.render("pages/dashboard/edit-profile", {
      title: "Edit Profile",
      flashMessage: Flash.getMessage(req),
      error: {},
      profile
    });
  } catch (err) {
    next(err);
  }
};

exports.postEditProfileController = async (req, res, next) => {
  let errors = validationResult(req).formatWith(errorFormatter);
  let {
    name,
    email,
    title,
    bio,
    website,
    facebook,
    twitter,
    github
  } = req.body;

  if (!errors.isEmpty()) {
    return res.render("pages/dashboard/edit-profile", {
      title: "Edit Profile",
      flashMessage: Flash.getMessage(req),
      error: errors.mapped(),
      profile: {
        name,
        email,
        title,
        bio,
        links: {
          website,
          facebook,
          github,
          twitter
        }
      }
    });
  }

  let profile = {
    name,
    email,
    title,
    bio,
    links: {
      website: website || "",
      facebook: facebook || "",
      twitter: twitter || "",
      github: github || ""
    }
  };

  try {
    let updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $set: profile },
      { new: true }
    );

    req.flash("success", "Updated Profile Successfully");
    res.render("pages/dashboard/edit-profile", {
      title: "Edit Profile",
      flashMessage: Flash.getMessage(req),
      error: {},
      profile: updatedProfile
    });
  } catch (error) {
    next(err);
  }
};

exports.bookmarksGetController = async(req,res,next)=>{
    try {

      let profile = await Profile.findOne({user: req.user._id})
                                         .populate({
                                           path:'bookmarks',
                                           model:'Post',
                                           select:'title thumbnail'
                                          })

      res.render('pages/dashboard/bookmarks',{
        title: "My Bookmarks",
        flashMessage: Flash.getMessage(req),
        posts:profile.bookmarks

      })
      
    } catch (error) {
       next(err)
      
    }
}

exports.commentsGetController = async(req,res,next)=>{
    try {

      let profile = await Profile.findOne({user: req.user._id})

      let comments = await Comment.find({post: { $in: profile.posts} })
                                       .populate({
                                         path:'post',
                                         select:'title'
                                       })
                                       .populate({
                                         path:'user',
                                         select:'username profilePics'
                                       })
                                       .populate({
                                         path:'replies.user',
                                         select:'username profilePics'
                                       })
                                         
         res.render('pages/dashboard/comments',{
            title: "My Recent Comments",
            flashMessage: Flash.getMessage(req),
            comments

        })
      
    } catch (error) {
       next(error)
      
    }
}

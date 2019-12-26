const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const errorFormatter = require("../utils/validationErrorFormatter");
const Flash = require("../utils/Flash");

exports.signupGetController = (req, res, next) => {

  
  res.render("pages/auth/signup", 
              { title: "Create a New Account" ,
                error:{}, 
                values:{},
                flashMessage: Flash.getMessage(req)
              });
};

exports.signupPostController = async (req, res, next) => {
  let { username, email, password } = req.body;

  let errors = validationResult(req).formatWith(errorFormatter);
  

  if (!errors.isEmpty()) {
    req.flash('fail','Please check your form')
    return res.render("pages/auth/signup", 
                 { title: "Create a New Account" ,
                   error:errors.mapped(), values:{
      username,
      email,
      password
    },flashMessage: Flash.getMessage(req)});
  }

  try {
    let hashedPassword = await bcrypt.hash(password, 11);

    let user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();
    req.flash('success', 'You have Successfully Registered')
    res.redirect("/login");
  } catch (e) {
    console.log(e);
    next(e);
  }
};

exports.loginGetController = (req, res, next) => {
  
 
  res.render("pages/auth/login", 
             { title: "Login to Your Account",
              error:{},
              flashMessage: Flash.getMessage(req)
            });
};

exports.loginPostController = async (req, res, next) => {

  
  
  let { email, password } = req.body;
  
   let errors = validationResult(req).formatWith(errorFormatter);
  

   if (!errors.isEmpty()) {

    req.flash('fail','Please check your form')
    return res.render("pages/auth/login", 
                     { title: "Login to Your Account" ,
                      error:errors.mapped(), values:{email, password},
                      flashMessage: Flash.getMessage(req)
                    });
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      req.flash('fail','Invalid Username/Password')
      return  res.render("pages/auth/login", 
                     { title: "Login to Your Account" ,
                      error:{}, values:{email, password},
                      flashMessage: Flash.getMessage(req)
                    });
    }

    let match = await bcrypt.compare(password, user.password);

    if (!match) {
      req.flash('fail','Invalid Username/Password')
      res.render("pages/auth/login", 
                     { title: "Login to Your Account" ,
                      error:{}, values:{email, password},
                      flashMessage: Flash.getMessage(req)
                    });
    }

    console.log("successfully logged in", user);
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save((err)=>{
       if(err){
         console.log(err);
         next(err)
       }
       req.flash('success','Successfully Logged In')
       res.redirect('/dashboard');
    })
    
    
  } catch (e) {
    console.log(e);
    next(e);
  }
};
exports.logoutController = (req, res, next) => {
    
     req.session.destroy((err)=>{
       if(err){
         console.log(err);
         next(err)
       }
       
       return res.redirect('/auth/login');
     })

};

exports.changePasswordGetController = async (req,res,next)=>{

    res.render('pages/auth/changePassword',{
      title:'Change My Password',
      flashMessage: Flash.getMessage(req)

    })

}

exports.changePasswordPostController = async (req,res,next)=>{

    let {oldPassword,newPassword,confirmPassword} = req.body;

    if(newPassword !== confirmPassword){
      req.flash('fail','Password does not match');
      return res.redirect('/auth/change-password');
    }

    try {
      let match = await bcrypt.compare(oldPassword,req.user.password);

      if(!match){
        req.flash('fail','Invalid Old Password');
        return res.redirect('/auth/change-password');

      }

      let hash  = await bcrypt.hash(newPassword,11);
      await User.findOneAndUpdate(
         {_id: req.user._id},
         {$set:{password: hash}}
         
      )

      req.flash('success','Password Updated Successfully');
      return res.redirect('/auth/change-password');

      
    } catch (error) {
        next(error)
    }

}


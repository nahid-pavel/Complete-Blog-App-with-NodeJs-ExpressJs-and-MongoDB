const mongoose = require('mongoose');

//title,bio,profileimage,user,links

const {Schema, model} = mongoose;

const profileSchema = new Schema({

     title:{
         type: String,
         maxLength: 100,
         trim: true,
         required: true
     },
     name:{

        type: String,
        maxLength: 30,
        trim: true,
        required: true

     },
     bio:{

         type: String,
         maxLength: 100,
         trim: true,
         required:true

     },
     profilePics: String,
     user:{
         type: Schema.Types.ObjectId,
         ref:'User',
         required: true
     },
     links:{
         website: String,
         facebook: String,
         twitter: String,
         Github: String
     },
     posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
     
},{ timestamps: true})

const Profile = model('Profile',profileSchema )

module.exports = Profile
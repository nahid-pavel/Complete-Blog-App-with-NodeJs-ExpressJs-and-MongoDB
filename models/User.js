const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    maxLength: 15
  },
  email: {
    type: String,
    trim: true,
    required: true,
    
  },
  password: {
    type: String,
    required: true,
    minLength: 5
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile"
  },
  profilePics: {
    type:String,
    default:'/uploads/default.png'


  }
},{
  timestamps: true
});

const User = model("User", userSchema);

module.exports = User;

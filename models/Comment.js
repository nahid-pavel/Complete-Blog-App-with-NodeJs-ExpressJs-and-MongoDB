//body,user,likes,dislikes,

const mongoose = require('mongoose');

const {Schema,model} = mongoose;

const commentSchema = new Schema({

    body:{
        type: String,
        required: true,
        trim: true
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:'Post',
        required: true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require: true

    },
    replies:[
        {
            body:{
                type: String,
                required: true

            },
            user:{

                type:Schema.Types.ObjectId,
                ref:'User',
                require: true


            },
            createAt:{
                type: Date,
                default: new Date()

            }


        }
    ]


},{timestamps: true})

const Comment = model('Comment',commentSchema);
module.exports = Comment;


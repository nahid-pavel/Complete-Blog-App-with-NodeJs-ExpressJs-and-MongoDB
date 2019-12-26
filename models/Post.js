//title,body,autor,created_at
const mongoose = require('mongoose');

const {Schema,model} = mongoose;

const postSchema = new Schema({
    title:{
        type:String,
        required: true,
        maxLength: 100,
        trim: true

    },
    body:{
        type:String,
        required: true,
        maxLength: 5000,
        trim: true

    },
    author:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    },  
    profile:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    tags:{
        type:[String],
        required: true
    },
    thumbnail:String,
    readTime:String,
    likes:[{
        type:Schema.Types.ObjectId,
        ref: 'User'


    }],
    dislikes:[{
        type:Schema.Types.ObjectId,
        ref: 'User'
     }],
    comments:[{
        type:Schema.Types.ObjectId,
        ref: 'Comment'


    }]

},{ timestamps: true})

postSchema.index({
    title: 'text',
    body:'text',
    tags:'text'
},{
    weights:{
        title:5,
        body:2,
        tags:5

    }
})
const Post = model('Post',postSchema);
module.exports = Post;

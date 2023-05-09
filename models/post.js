const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId }
})

const commentSchema = mongoose.Schema( {
    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId}, //idk about this. double check
    comment: {type: String},
    created: {type: Date, default: Date.now(), select: false}
})


const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 
    photoUrl: String,
    caption: String, 
    // swapstatus: { type: Boolean, default: false }, // we will create a button for the swap (IF WE HAVE TWO)
    swapstatus: { type: String, enum: ["YES", "NO", "MAYBE"]},
    likes: [likeSchema],
    comments: [commentSchema]
})

module.exports = mongoose.model('Post', postSchema);
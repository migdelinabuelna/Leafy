const mongoose = require('mongoose');

const commentSchema = mongoose.Schema( {
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, //idk about this. double check
    username: String,
    comment: String,
    created: {type: Date, default: Date.now(), select: false}
}, {timestamps: true})


const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 
    photoUrl: String,
    caption: String, 
    // swapstatus: { type: Boolean, default: false }, // we will create a button for the swap (IF WE HAVE TWO)
    swapstatus: { type: String, enum: ["YES", "NO", "MAYBE"]},
    // likes: [likeSchema],
    comments: [commentSchema]
}, {timestamps: true})

module.exports = mongoose.model('Post', postSchema);
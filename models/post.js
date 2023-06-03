const mongoose = require('mongoose');

const commentSchema = mongoose.Schema( {
    username: String,
    comment: String,
    created: {type: Date, default: Date.now(), select: false}
}, {timestamps: true})

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 
    photoUrl: String,
    caption: String, 
    swapstatus: { type: String, enum: ["YES", "NO", "MAYBE"]},
    comments: [commentSchema]
}, {timestamps: true})

module.exports = mongoose.model('Post', postSchema);
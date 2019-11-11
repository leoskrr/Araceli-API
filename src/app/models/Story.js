const mongoose = require('mongoose');

const StorySchema = mongoose.Schema({
    title: String,
    description: String,
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Story', StorySchema);
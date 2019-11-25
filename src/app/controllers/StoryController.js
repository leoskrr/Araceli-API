//Models
const Story = require('../models/Story');
const { existsOrError, notExistsOrError } = require('../../utils/validation');
module.exports = {

    index(req, res) {
        Story.find({}, (err, stories) => {
            if (err)
                return res.status(500).send({ "error": err });

            return res.send(stories);
        })
    },

    async store(req, res) {
        const story = { ...req.body };

        try {
            existsOrError(story.title, "story's title must be informed");
            existsOrError(story.description, "story's description must be informed");

            const storyFromDB = await Story.find({ title: story.title })
                .where({ authorId: req.userId });

            notExistsOrError(storyFromDB, "a story with this title by this author alredy exists");

        } catch (err) {
            return res.status(400).send({ "error": err });
        }

        story.authorId = req.userId;
        Story.create(story, (err, created) => {
            if (err)
                return res.status(500).send({ "error": err });

            return res.send(created);
        })
    },

    show(req, res) {
        const _id = req.params.id;

        Story.findOne({ _id }, (err, result) => {
            if (err)
                return res.status(500).send({ "error": err });

            return res.send(result);
        })
    },

    async delete(req, res) {
        const _id = req.params.id;

        Story.findOneAndDelete({ _id }, (err) => {
            if (err)
                return res.status(500).send({ "error": err });
            
            return res.status(204).send();
        });
    }

}
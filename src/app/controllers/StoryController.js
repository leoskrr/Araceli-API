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

            const storyFromDB = await Story.findOne({ title: story.title })
                .where({ authorId: req.userId });

            notExistsOrError(storyFromDB, "a story with this title by this author already exists");
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

    async update(req, res) {
        const { id } = req.params.id;

        const story = { ...req.body };

        try {
            existsOrError(story.title, "story's title must be informed");
            existsOrError(story.description, "story's description must be informed");

            const storyFromDB = await Story.findOne({ title: story.title })
                .where({ authorId: req.userId });

            notExistsOrError(storyFromDB, "a story with this title by this author already exists");
        } catch (err) {
            return res.status(400).send({ "error": err });
        }

        Story.findOneAndUpdate(id, {
            title: story.title,
            description: story.description
        }, (err) => {
            if (err)
                return res.status(500).send({ "error": err });

            return res.status(204).send();
        })
    },

    async delete(req, res) {
        const { id } = req.params;

        Story.findByIdAndDelete(id, (err) => {
            if (err)
                return res.status(500).send({ "error": err });

            return res.status(204).send();
        });
    }

}
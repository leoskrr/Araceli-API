const User = require('../models/User');

const { existsOrError, notExistsOrError } = require('../../utils/validation');
const { crypt: cryptPwd } = require('../../utils/pwdMethods');
module.exports = {

    index(req, res) {
        User.find({}, (err, users) => {
            if (err)
                return res.status(500).send({ "error": err });

            return res.json(users);
        })
    },

    async store(req, res) {
        const user = { ...req.body };

        try {
            existsOrError(user.name, "user's name must be informed");
            existsOrError(user.email, "user's email must be informed");
            existsOrError(user.password, "user's password must be informed");

            const userFromDB = await User.findOne({ email: user.email });

            notExistsOrError(userFromDB, `there is already a registered user with email ${user.email}`);

        } catch (error) {
            return res.status(400).send({ "error": error });
        }

        user.password = cryptPwd(user.password);

        User.create(user, (err) => {
            if (err)
                return res.status(500).send({ "error": err });

            user.password = undefined;
            return res.send(user);
        })
    },

}
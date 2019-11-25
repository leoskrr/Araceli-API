const jwt = require('jsonwebtoken');

const { compare: comparePwd } = require('../../../utils/pwdMethods');
const { auth } = require('../../../.env');
const User = require('../../models/User');


module.exports = {

    async signIn(req, res) {
        const { email, password } = req.body;
        const secret = process.env.SECRET || auth.secret

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).send({ "error": "user not found" })
        }

        if (!comparePwd(password, user.password)) {
            return res.status(400).send({ "error": "incorrect password" });
        }

        user.password = undefined;

        //parameters: difference between tokens, application's hash
        const token = jwt.sign({ id: user._id }, secret);

        res.send({ user, token });

    }

}
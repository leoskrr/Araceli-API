const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(8);

function crypt(password) {

    return bcrypt.hashSync(password, salt);

}

function compare(typed, original) {

    return bcrypt.compareSync(typed, original);

}

module.exports = { crypt, compare }
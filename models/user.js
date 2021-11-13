var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {type: String, required: [true, 'Email jest wymagany !'] },
    password: {type: String, required: [true, 'Hasło jest wymagane !']},
    created: {type: Date, default: Date.now},
    avatar: {type: String, required: [true, 'Pole wymagane !']},
    name: {type: String, required: [true, 'Pole wymagane !']},
    energy: Number,
    respect: Number,
    cash: Number,
});

module.exports = mongoose.model('Users', userSchema)
const mongoose = require("mongoose");
const skillsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Skills', skillsSchema);
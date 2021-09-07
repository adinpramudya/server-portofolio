const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
    nameProject: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Project', projectSchema);
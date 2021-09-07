const mongoose = require("mongoose");
const certificatesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
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

module.exports = mongoose.model('Certificates', certificatesSchema);
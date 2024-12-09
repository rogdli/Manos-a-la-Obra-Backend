const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const Project = require('./Project'); 

const epicSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: Project,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    icon: {
        type: String,
        required: false
    },
});

const Epic = model('Epic', epicSchema);
module.exports = Epic;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    url: { type: String },
});

module.exports = mongoose.model("Project", ProjectSchema);

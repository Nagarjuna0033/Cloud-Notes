// import mongoose, { mongo } from "mongoose";
const mongoose = require("mongoose");
const { Schema } = mongoose;

const notesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    title: {
        type: String,
        // required: true,
    },
    description: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Notes", notesSchema);

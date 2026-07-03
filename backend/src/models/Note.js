import mongoose from "mongoose";

// 1st step: create a schema
//2nd step: create a model off of that schema

const noteSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    {timestamps: true} //createAt, updatedAt
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
    try { 
        const note = await Note.find().sort({ createdAt: -1 }); //sort by createdAt in descending order
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getAllNotes controller", error.message);
        res.status(500).json({message: "Error fetching notes"});
    }
}

export async function getNoteById(req, res) {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(note);
    }   catch (error) {
        console.error("Error in getNoteById controller", error.message);
        res.status(500).json({message: "Error fetching note"});
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content });
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in createNote controller", error.message);
        res.status(500).json({message: "Error creating note"});
    }
}

export async function updateNote(req, res) {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updateNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!updateNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(updateNote);
    } catch (error) {
        console.error("Error in updateNote controller", error.message);
        res.status(500).json({ message: "Error updating note" });
    }
}

export async function deleteNote(req, res) {
    try {
        const { id } = req.params;
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted successfully!" });
    } catch (error) {
        console.error("Error in deleteNote controller", error.message);
        res.status(500).json({ message: "Error deleting note" });
    }
}
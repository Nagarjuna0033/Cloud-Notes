const express = require("express");
const user = require("../middleware/fetchuser");
const Notes = require("../model/Notes");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// a notes fot fetching all notes

router.get("/", user, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user });
        res.json(notes);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal error" });
    }
});

// A route for adding notes to database

router.post(
    "/add",
    user,
    [body("description", "Add a note").isLength({ min: 1 })],
    async (req, res) => {
        try {
            const { title, description } = req.body;
            const err = validationResult(req);
            if (!err.isEmpty()) {
                return res.status(400).json({ error: err.array() });
            }

            const notes = new Notes({
                title,
                description,
                user: req.user,
            });

            const savedNote = await notes.save();

            res.json(savedNote);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Internal error" });
        }
    }
);

// A rotute for editing of notes

router.put(
    "/edit/:id",
    user,
    [body("description", "Add a note").isLength({ min: 1 })],
    async (req, res) => {
        try {
            const { title, description } = req.body;
            const err = validationResult(req);
            if (!err.isEmpty()) {
                return res.status(400).json({ error: err.array() });
            }

            const notes = {
                title,
                description,
            };

            let id = await Notes.findById(req.params.id);

            if (!id) {
                return res.status(400).send("Access Denied");
            }
            if (id.user.toString() !== req.user) {
                return res.status(400).send("not allowed");
            }

            id = await Notes.findByIdAndUpdate(
                req.params.id,
                { $set: notes },
                { new: true }
            );
            const savedNote = await id.save();

            res.json(savedNote);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Internal error" });
        }
    }
);

// A route for deleting notes

router.delete(
    "/delete/:id",
    user,

    async (req, res) => {
        try {
            let id = await Notes.findById(req.params.id);

            // check whether given id is valid or not

            if (!id) {
                return res.status(400).send("Not found");
            }

            // checking whether given id and user id is valid or not

            if (id.user.toString() !== req.user) {
                return res.status(400).send("not allowed");
            }

            id = await Notes.findByIdAndDelete(req.params.id);

            res.json({ Success: "Notes has been deleted", id: id });
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Internal error" });
        }
    }
);

module.exports = router;

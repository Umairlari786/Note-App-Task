//file is for cmd for redirecting fron one funtion to another.

const express = require("express");
const router = express.Router();
const Note = require('../models/Notes');

router.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const end = Date.now();
        const executionTime = end - start;
        console.log(`[${req.method}] ${req.originalUrl} - Execution Time: ${executionTime}ms`);
    });
    next();
});

// Define counters for POST and PUT requests
let postCount = 0;
let putCount = 0;

// Middleware to increment postCount for each POST request
router.use('/add', (req, res, next) => {
    postCount++;
    next();
});

// Middleware to increment putCount for each PUT request
router.use('/update/:id', (req, res, next) => {
    putCount++;
    next();
});

// Get count of POST and PUT requests
router.get('/count', (req, res) => {
    res.json({ 
        postCount: postCount,
        putCount: putCount
    });
});

//get all the notes

router.get('/', async(req,res)=>{

    try{
        const notes = await Note.find();
        res.json(notes);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: err.message});
    }

})

//to get single note Id
router.get('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note)
            return res.status(404).json({ message: 'Note not found' });
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//create a note in the db
router.post('/add', async (req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    });
    try {
        
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

//update a note by ID
router.put('/update/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note)
            return res.status(404).json({ message: 'Note not found' });

        if (req.body.title)
            note.title = req.body.title;
        if (req.body.content)
            note.content = req.body.content;
        const updateNote = await note.save();
        res.json(updateNote);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note)
            return res.status(404).json({ message: 'Note not found' });
        await note.deleteOne();
        res.json({ message: "Note deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;
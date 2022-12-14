// Dependencies
const express = require ('express');
const fs =require('fs');
const path = require ('path');
// note database
const notes = require('./data/db.json')
// npm uuid.v4 - random UUID (may try uuid.v1 - timestamp)
const {v4 : uuidv4} = require('uuid');
const { dirname } = require('path');

// setting up express server
const PORT = process.env.PORT || 3001;
const app = express ();

// linking assets
app.use(express.static('public'));

// incoming data parsing (JSON) - Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// connect to data base (db)
app.get('/api/notes', (req, res) => {
    // working -- used insomnia to pull upbody
    res.json(notes)
})

// add note -- works w insomnia
app.post('/api/notes', (req, res) => {
    console.log(req.body);
        res.json(req.body);

        // create new note with unique id
        const newNote = ({
            id: uuidv4(),
            ...req.body
        })
    notes.push(newNote);

    // add new note to database\
    fs.writeFileSync(
        path.join(__dirname,'./data/db.json'),
        JSON.stringify(notes, null, 2)
    );
    return notes;
});


// load notes html
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// load html / for home page * -- catch all
app.get('*', function (req, res) {
    // res.send('does the server work?') -- Worked
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.delete('/api/notes/:id', (req, res) => {
    for (let i = 0; i < notes.length; i++) {

        if (notes[i].id == req.params.id) {
            // Splice takes i position, and then deletes the 1 note.
            notes.splice(i, 1);
            break;
        }
    }
    // Write the db.json file again.
    fs.writeFileSync(
        path.join(__dirname,'./data/db.json'), 
        JSON.stringify(notes, null, 2), 
    );
    res.json(notes)
});
    

// chain listen method to server
app.listen (PORT, () => {
    console.log(`API server is now on port ${PORT}!`);
});
// Dependencies
const express = require ('express');
const fs =require('fs');
const path = require ('path');
const notes = require('./data/db.json')

// setting up express server
const PORT = process.env.PORT || 3001;

const app = express ();

// linking assets
app.use(express.static('public'));

// incoming data parsing (JSON) - Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// load html 
// app.get('*', function (req, res) {
//     // res.send('does the server work?') -- Worked
//     res.sendFile(path.join(__dirname, './public/index.html'));
// });

// // load notes html
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, './public/notes.html'));
// });

app.get('/api/notes', (req, res) => {
    // working -- used insomnia to pull upbody
    res.json(notes)
})

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    res.json(req.body);
});





// chain listen method to server
app.listen (PORT, () => {
    console.log(`API server is now on port ${PORT}!`);
});
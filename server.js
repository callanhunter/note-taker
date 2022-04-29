const express = require('express');
const path = require('path');
const fs = require('fs');
let notes = require('./db/db.json');

const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(express.static('public'));


app.post('/api/notes',(req,res)=>{
    console.info("${req.method} request recieved to add a note");
    const { title , text } = req.body;
    if(title && text){
        const newNote = {
            title,
            text,
        };
        const reviewNote = JSON.stringify(newNote);

        fs.writeFile("./db/db.json",reviewNote, (err)=>
        err ? console.error(err) : console.log("Note has been written to JSON file")
        );

    const response ={
        status: 'success',
        body: newNote,
    };
    console.log(response);
    res.json(response)
    } else {
        res.json('error in posting note');
    }
});



app.get('/api/notes', (req, res) => {
    res.json(`${req.method} request received to retrieve notes`);
    console.info(`${req.method} request received to retrieve notes`);
});


app.post('/api/notes', (req, res) => {
    if (req.body && req.params.notes) {
        console.info(`${req.method} request received for notes`);
        console.info(req.body);
        const notesId = req.params.notes;
        for (let i = 0; i < notes.length; i++) {
            const currentNote = notes[i];
            if (currentNote.note_id === notesId) {
                res.json(`New note is: ${currentNode}`);
                return;
        }
    }
    res.json('Notes not found');
    }
});



// return to the notes.html file.
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// return to the index.html file.
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);



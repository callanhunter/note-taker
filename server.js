const express = require('express');
const path = require('path');
let db = require('./db/db.json');


const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    console.log(notes);
    res.json(notes);
        res.json(`${req.method} request received to get reviews`);
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                res.json(JSON.parse(data));
            }
        }
    console.info(`${req.method} request received to get reviews`);
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


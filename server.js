const path = require("path");
const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

const Directory = path.join(__dirname, "/public");

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get("/notes", function(req, res) {
    res.sendFile(path.join(Directory, "notes.html"));

});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(notesData);
    notesData = fs.readFileSync("./db/db.json", "utf8");
    notesData = JSON.parse(notesData);
    if (!err) {
        debugger;
    } else {
        console.log(err);

    }

    res.json(notesData);
});

app.post('/api/notes', (req, res) => {
    const lastIdNum = notesData.length ? Math.max(...(notesData.map(note => note.id))) : 0;
    const id = lastIdNum + 1;
    notesData.push({ id, ...req.body });
    res.json(notesData.slice(-1));
    notesData = fs.readFileSync("./db/db.json", "utf8");
    notesData = JSON.parse(notesData);
    fs.writeFile("./db/db.json", notesData, "utf8", function(err) {

        if (!err) {
            debugger;
        } else
            throw err;
    });

    res.json(JSON.parse(notesData));

});

app.delete('/api/notes/:id', (req, res) => {
    let note = notesData.find(({ id }) => id === JSON.parse(req.params.id));
    notesData.splice(notesData.indexOf(note), 1);
    res.end("deleted the Note");

    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteId = req.params.id;
    let newId = 0;
    console.log(`Deleting note with ID ${noteId}`);
    savedNotes = savedNotes.filter(currNote => {
        return currNote.id != noteID;
    })

    for (currNote of savedNotes) {
        currNote.id = newId.toString();
        newID++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
const path = require("path");
const express = require("express");
const fs = require("fs");
const notesData = require("./db/db.json");

const app = express();
const PORT = 3000;

const Directory = path.join(__dirname, "Develop/public");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("/"));


app.get("api/notes", function(req, res) {
    res.sendFile(path.join(Directory, "notes.html"));

});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.json(notesData);
    notesData = fs.readFileSync("./Develop/db/db.json", "utf8");
    notesData = JSON.parse(notesData);
    if (!err) {
        debugger;
    } else {
        console.log(err);

    }

    res.json(notesData);
});

app.post("/api/notes", (req, res) => {
    const lastIdNum = notesData.length ? Math.max(...(notesData.map(note => note.id))) : 0;
    let id;
    id = lastIdNum + 1;
    notesData.push({ id, ...req.body });
    res.json(notesData.slice(-1));
    notesData = fs.readFileSync("./Develop/db/db.json", "utf8");
    notesData = JSON.parse(notesData);
    fs.writeFile("./Develop/db/db.json", notesData, "utf8", function(err) {
        if (!err) {
            debugger;
        } else {
            console.log(err);
        }
        throw err;
    });

    res.json(JSON.parse(notesData));
});

app.delete("/api/notes/:id", (req, res) => {
    let note;
    note = notesData.find(({ id }) => id === JSON.parse(req.params.id));
    notesData.splice(notesData.indexOf(note), 1);


    let savedNoteData;
    savedNoteData = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
    let noteId = req.params.id;
    let newId;
    newId = 0;
    console.log(`Deleting Note ${noteId}`);
    res.end("Deleted The Note");
    savedNoteData = savedNoteData.filter(currentNote => {
        return currentNote.id != noteId;
    })

    for (currentNote of savedNoteData) {
        currentNote.id = newId.toString();
        newID++;
    }

    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(savedNoteData));
    res.json(savedNoteData);
});

app.listen(PORT, () =>
    console.log(`listening on port ${PORT}`));
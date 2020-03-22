const path = require("path");
const express = require("express");
const fs = require("fs");


const app = express();
const PORT = 3000;

const Directory = path.join(__dirname, "public");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("/"));


app.get("/notes", function(req, res) {
    res.sendFile(path.join(Directory, "./notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(Directory, "./index.html"));
});

app.get("api/notes", (req, res) => {
    res.json(JSON.parse(fs.readFileSync("./Develop/db/db.json")));
});

app.get("/api/notes", (req, res) => {
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(savedNoteData));
    console.log("Note saved to db.json File as: ", newNote);
    res.json(savedNoteData);
    const notesdata = JSON.parse(fs.readFileSync("./Develop/db/db.json"));
    for (let i = 0; i < notesdata.length; i++) {
        const note = notesdata[i];
        if (note.id == req.params.id) {
            res.json(note);

        }
    }
});

app.post("/api/notes", (req, res) => {
    const data = req.body;
    const notes = JSON.parse(fs.readFileSync("./Develop/db/db.json"));
    data.id = notes.length ? notes[notes.length - 1].id + 1 : 1;
    notes.push(data);
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(notes));
    res.end;
})

notes = fs.readFileSync("./Develop/db/db.json", "utf8");
fs.writeFile("./Develop/db/db.json", JSON.stringify(notes), "utf8", function(err) {
    if (!err) {
        debugger;
    } else {
        console.log(err);

    }
});

app.delete("/api/notes/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./Develop/db/db.json"));
    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        if (note.id == req.params.id) {
            notes.splice(i, 1);
        }
    }
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(notes));
    res.json(notes);
    res.end
});

for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    if (note.id == req.params.id) {
        notes.splice(i, 1);
    }

    const savedNoteData = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8")); {
        let noteID = req.params.id;
        let newID;
        newID = 0;
        console.log(`ID ${noteID} has been deleted`);
        savedNoteData = savedNoteData.filter(currentNote => {
            return currentNote.id != noteID; {}

        });
    }
    for (currentNote of savedNoteData) {
        currentNote.id = newID.toString();
        newID++;


        fs.writeFileSync("./Develop/db/db.json", JSON.stringify(savedNoteData));
        res.json(savedNoteData);
    }
}
app.listen(PORT, () =>
    console.log(`listening on port ${PORT}`));
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
    res.sendFile(path.join(__dirname, "./notes.html"));
});

app.get("/api/notes", (req, res) => {
    let notesData = fs.readFileSync("./Develop/db/db.json", "utf8");
    notesData = JSON.parse(notesData);
    res.json(notesData);
    if (!err) {
        debugger;
    } else {
        console.log(err);
    }

});

app.post("/api/notes", (req, res) => {

    let notesData = fs.readFileSync("./Develop/db/db.json", "utf8");
    notesData = JSON.parse(notesData);
    const lastIdNum = notesData[0].id;
    let id;
    id = lastIdNum + 1;
    notesData.push({ id, ...req.body });
    res.json(notesData.slice(-1));
    notesData = fs.readFileSync("./Develop/db/db.json", "utf8");
    notesData = JSON.parse(notesData);
    fs.writeFile("./Develop/db/db.json", JSON.stringify(notesData), "utf8", function(err) {
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
    let notesData = fs.readFileSync("./Develop/db/db.json", "utf8");

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
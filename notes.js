const fs = require('fs');

const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes(); 
    const duplicateNote = notes.find((note) => note.title === title)

    debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const newNotes = notes.filter((note) => note.title !== title)

    if (newNotes.length === notes.length) {
        console.log(chalk.red.inverse('Note with title: "'+title+'" doesn\'t exist'));
    } else {
        console.log(chalk.green.inverse('We removed note with title: "'+title+'"'));
    }

    saveNotes(newNotes);
}

const listNotes = () => {
    const notes = loadNotes();

    notes.forEach((note)=> {
        console.log(chalk.yellow(note.title))
    })
}

const readNote = (title) => {
    const notes = loadNotes();

    const findingNote = notes.find((note) => note.title === title)

    if (findingNote) {
        console.log(chalk.green.inverse('Title of finding note: "'+findingNote.title+'"'))
    } else {
        console.log(chalk.red.inverse('Error'))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
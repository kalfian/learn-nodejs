const validator = require("validator");
const chalk = require("chalk");
const yargs = require("yargs");
const notes = require('./notes')

// console.log(validator.isURL("https://asaf.com"));
yargs.version("1.1.0");

yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Note Body",
            demandOption: true,
            type: "String"
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
        // console.log("Title " + argv.title);
        // console.log("Body " + argv.body);
    }
});

yargs.command({
    command: "remove",
    describe: "Remove a Note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
});

yargs.command({
    command: "list",
    describe: "List a Note",
    handler() {
        notes.listNotes()
    }
});

yargs.command({
    command: "read",
    describe: "Read a note",
    builder: {
        title: {
            describe: "Title note",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
});

// console.log(yargs.argv);
yargs.parse();
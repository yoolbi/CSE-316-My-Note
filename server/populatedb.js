#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
// var Note = require('./models/note')
// var User = require('./models/user')
var Note = mongoose.model('Note', NoteSchema);
module.exports = Note;
var User = mongoose.model('User', UserSchema);
module.exports=User;

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var notes = []
var users = []

function noteCreate(text, lastUpdatedDate, cb) {
    notedetail = {
        text: text,
        lastUpdatedDate: lastUpdatedDate,
    }

    var note = new Note(notedetail);

    note.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Note: ' + note);
        notes.push(note)
        cb(null, note);
    });
}

function userCreate(name, email, location, cb) {
    var user = new User({name: name, email: email, location: location});

    user.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New User: ' + user);
        users.push(user)
        cb(null, user);
    });
}

function createNotes(cb) {
    async.parallel([
        function(callback) {
            noteCreate('Some other note', 8/10/2021, callback)
        },
        function(callback) {
            noteCreate('# CSE 101', 9/10/2021, callback)
        },
        function(callback) {
            noteCreate('# CSE 316', 10/20/2021, callback)
        }
        ],
        cb);
}

function createUsers(cb) {
    async.parallel([
        function(callback) {
            userCreate('Yool Bi Lee', 'yoolbi.lee@stonybrook.edu', 'Songdo', callback)
        }
        ],
        cb);
}

async.series([
    createUsers,
    createNotes
],
    // Optional callback
    function(err, results) {
        if (err) {
            console.log('FINAL ERR: '+err);
        }
        else {
            console.log('notes: '+ notes);

        }
        // All done, disconnect from database
        mongoose.connection.close();
});


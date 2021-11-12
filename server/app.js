const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Note = require('./models/note');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // MongoDB session store

// Multer is middleware for multipart form data: https://www.npmjs.com/package/multer
const multer = require('multer');
// This part is a temporary place to store the uploaded files
// In actual development we would not store it on the local server
const upload = multer({dest: 'uploads/'})

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const sessionSecret = 'make a secret string';

//Set up mongoose connection
var dbURL = 'mongodb+srv://yoolbi:yoolbi716@cluster0.mcvce.mongodb.net/local_library?retryWrites=true&w=majority'; // insert your database URL here
mongoose.connect(dbURL, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create Mongo DB Session Store
const store = MongoStore.create({
    mongoUrl: dbURL,
    secret: sessionSecret,
    touchAfter: 24 * 60 * 60
})

// Changing this setting to avoid a Mongoose deprecation warning:
// See: https://mongoosejs.com/docs/deprecations.html#findandmodify
// mongoose.set('useFindAndModify', false);

// Setup to use the express-session package
const sessionConfig = {
    store,
    name: 'session',
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
        // later you would want to add: 'secure: true' once your website is hosted on HTTPS.
    }
}

app.use(session(sessionConfig));

// This is a function we can use to wrap our existing async route functions so they automatically catch errors
// and call the next() handler
function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}

const requireLogin = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).send("Need to login");
    }
    next();
}

// This is middleware that will run before every request
app.use((req, res, next) => {
    console.log(req.method, req.path, req.session.userId);
    // Calling next() makes it go to the next function that will handle the request
    next();
});

app.post('/api/register', wrapAsync(async function (req, res) {
    const {password, email, name} = req.body;
    const user = new User({email, password, name})
    await user.save();
    req.session.userId = user._id;
    // Note: this is returning the entire user object to demo, which will include the hashed and salted password.
    // In practice, you wouldn't typically do this – a success status would suffice, or perhaps just the user id.
    res.json(user);
}));

app.post('/api/login', wrapAsync(async function (req, res) {
    const {password, email} = req.body;
    const user = await User.findAndValidate(email, password);
    if (user) {
        req.session.userId = user._id;
    } else {
        res.sendStatus(401);
    }
    res.json(user);
}));

app.post('/api/logout', wrapAsync(async function (req, res) {
    req.session.userId = null;
    res.sendStatus(204);
}));

// upload.single('image') tells it we are only uploading 1 file, and the file was named "image" on the front end client.
app.post('/api/users/:id/file', upload.single('image'), wrapAsync(async function (req, res) {
    // You can see the file details here – it also gets automatically saved into the uploads folder
    // Again, this is an example of how this works but you would do something a little different in production.
    console.log("File uploaded of length: " + req.file.size);
    console.dir(req.file);
    res.json("File uploaded successfully");
}));

//User
app.use('/api/users/:id', (req, res, next) => {
    console.log("Request involving a specific user")
    next(); // Try commenting out this next() and accessing a specific author page
})

// Using an async function to be able to use the "await" functionality below, which makes
// the find command run synchronously.
app.get('/api/users', wrapAsync(async function (req,res) {
    let users;
    // Check the search query, if ?books=yes then uses aggregate
    if (req.query.notes && req.query.notes === 'yes') {
        // This will retrieve authors and do a lookup on all the books that they are linked to, adding a new "books" array
        // Then the second stage will sort them by family_name, ascending
        // More steps could be added to this pipeline if needed.
        let aggregatePipeline = [
            {
                '$lookup': {
                    'from': 'notes',
                    'localField': '_id',
                    'foreignField': 'user',
                    'as': 'notes'
                }
            }, {
                '$sort': {
                    'name': 1
                }
            }
        ]
        users = await User.aggregate(aggregatePipeline);
    } else {
        // users = await User.find({});
        users = await User.findById(req.session.userId);
    }
    res.json(users);
}));

app.get('/api/users/:id', wrapAsync(async function (req,res, next) {
    let id = req.params.id;
    if (mongoose.isValidObjectId(id)) {
        const user = await User.findById(id);
        if (user) {
            res.json(user);
            return;
        } else {
            // The thrown error will be handled by the error handling middleware
            throw new Error('User Not Found');
        }
    } else {
        throw new Error('Invalid User Id');
    }
}));

app.delete('/api/users/:id', wrapAsync(async function (req, res) {
    const id = req.params.id;
    const result = await User.findByIdAndDelete(id);
    console.log("Deleted successfully: " + result);
    res.json(result);
}));

app.put('/api/users/:id', wrapAsync(async function (req, res) {
    const id = req.params.id;
    const {name, email, password, profile_url, location} = req.body;
    console.log("PUT with id: " + id + ", body: " + JSON.stringify(req.body));
    // This below method automatically saves it to the database
    // findByIdAndUpdate by default does not run the validators, so we need to set the option to enable it.
    await User.findByIdAndUpdate(id, {name, email, password, profile_url, location},
        {runValidators: true});
    // Status 204 represents success with no content
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204
    res.sendStatus(204);
}));

// The React app does not call the below methods, but these are further examples of using Express
app.post('/api/users', wrapAsync(async function (req, res) {
    console.log("Posted with body: " + JSON.stringify(req.body));
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        // profile_url: req.body.profile_url,
        // location: req.body.location,
    })
    // Calling save is needed to save it to the database given we aren't using a special method like the update above
    await newUser.save();
    res.json(newUser);
}));

app.get('/api/currentUser', wrapAsync(async function (req, res) {
    const user = await User.findById(req.session.userId);
    res.json(user);
}));

//Note
app.use('/api/notes', (req, res, next) => {
    console.log("Request involving a specific note")
    next(); // Try commenting out this next() and accessing a specific author page
})

// Using an async function to be able to use the "await" functionality below, which makes
// the find command run synchronously.
app.get('/api/notes', requireLogin, wrapAsync(async function (req,res) {
    console.log("Accessed by user id: " + req.session.userId);
    // const notes = await Note.find({owner: req.session.userId}).populate('user');
    const notes = await Note.find({owner: req.session.userId});
    // const notes = await Note.find({}).sort({lastUpdatedDate: -1});
    res.json(notes);
}));

app.get('/api/notes/:id', requireLogin, wrapAsync(async function (req,res, next) {
    let id = req.params.id;
    if (mongoose.isValidObjectId(id)) {
        const note = await Note.findById(id);
        if (note) {
            res.json(note);
            return;
        } else {
            // The thrown error will be handled by the error handling middleware
            throw new Error('User Not Found');
        }
    } else {
        throw new Error('Invalid Note Id');
    }
}));

app.delete('/api/notes/:id', requireLogin, wrapAsync(async function (req, res) {
    const id = req.params.id;
    const result = await Note.findByIdAndDelete(id);
    console.log("Deleted successfully: " + result);
    res.json(result);
}));

app.put('/api/notes/:id', requireLogin, wrapAsync(async function (req, res) {
    const id = req.params.id;
    console.log("PUT with id: " + id + ", body: " + JSON.stringify(req.body));
    // This below method automatically saves it to the database
    // findByIdAndUpdate by default does not run the validators, so we need to set the option to enable it.
    await Note.findByIdAndUpdate(id, {'text': req.body.text, "lastUpdatedDate": req.body.lastUpdatedDate, "owner": req.session.userId},
        {runValidators: true});
    // Status 204 represents success with no content
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204
    res.sendStatus(204);
}));

// The React app does not call the below methods, but these are further examples of using Express
app.post('/api/notes', requireLogin, wrapAsync(async function (req, res) {
    console.log("Posted with body: " + JSON.stringify(req.body));
    const newNote = new Note({
        text: req.body.text,
        lastUpdatedDate: req.body.lastUpdatedDate,
        owner: req.session.userId
    })
    // Calling save is needed to save it to the database given we aren't using a special method like the update above
    await newNote.save();
    res.json(newNote);
}));

app.use((err, req, res, next) => {
    console.log("Error handling called");
    // If want to print out the error stack, uncomment below
    // console.error(err.stack)
    // Updating the statusMessage with our custom error message (otherwise it will have a default for the status code).
    res.statusMessage = err.message;

    if (err.name === 'ValidationError') {
        res.status(400).end();
    }
    else {
        // We could further interpret the errors to send a specific status based more error types.
        res.status(500).end();
    }
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server started on ${port}!`)
});

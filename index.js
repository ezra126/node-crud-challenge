const express = require('express')
const app = express()
const personRoutes = require('./routes/personRoute')
const bodyParser = require('body-parser');
const cors = require('cors');
const { notFound, errorHandler } = require("./middlewares/errorHandler");

let persons = [{
    id: '1',
    name: 'Sam',
    age: '26',
    hobbies: []
}] //This is your in memory database

// Initialize your in-memory database (or use a real one)
app.set('db', persons);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to attach `db` to `req`
app.use((req, res, next) => {
    req.db = app.get('db');
    next();
});

// Use the routes

// Pass `app` to your controller
app.use('/person', personRoutes);
app.get('*', function (req, res, next) {
    let error = new Error("Not Found");
    error.statusCode = 404
    next(error)
});

app.use(notFound)
app.use(errorHandler);

// app.set('db', persons)
//TODO: Implement crud of person

if (require.main === module) {
    app.listen(3000);
}
module.exports = app;
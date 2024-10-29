const express = require('express');
const { createPerson, getAllPersons, getPerson, updatePerson, deletePerson } = require('../controllers/personController')
const router = express.Router();

//get all persons
router.get('/', getAllPersons);

//get person
router.get('/:personId', getPerson);

//create person
router.post('/', createPerson)

//update person
router.put('/:personId', updatePerson)

//delete person
router.delete('/:personId', deletePerson)

// router.post('/', (req, res) => {
//     res.send('Create a new user');
// });

// router.get('/:id', (req, res) => {
//     const userId = req.params.id;
//     res.send(`User with ID: ${userId}`);
// });

// Export the router to use it in app.js
module.exports = router;
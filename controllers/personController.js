const personSchema = require('../models/personModel')
const { generateUUID } = require('../utils/utilGenerator')


//add person
exports.createPerson = async (req, res, next) => {
    const people = req.db;
    try {
        const id = generateUUID()
        const newPerson = await personSchema.validateAsync({ id, ...req.body });
        people.push(newPerson)
        //const response = await supabaseAxios.post(`/${tableName}`, newPerson);
        return res.status(200).json(newPerson);
    } catch (error) {
        next(Error("Internal Server Error"))
    }
};

// get person with id
exports.getPerson = async (req, res, next) => {
    const people = req.db;
    const { personId } = req.params
    try {
        //const person = await supabaseAxios.get(`/${tableName}?id=eq.${personId}`); 
        const person = people.find(person => person.id === personId)
        if (person) {
            return res.status(200).json(person);
        } else {
            const err = new Error(`person with ID ${personId} not found`);
            err.statusCode = 404
            return next(err)
        }
    } catch (error) {
        next(Error("Internal Server Error"))
        //return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// get all persons
exports.getAllPersons = async (req, res, next) => {
    const people = req.db;
    try {
        //const response = await supabaseAxios.get(`/${tableName}`); // Replace with your data fetching logic
        return res.status(200).json(people);
    } catch (error) {
        next(Error("Internal Server Error"))
    }
};

// Function to get a person by ID from the Map
exports.updatePerson = async (req, res, next) => {
    let people = req.app.get('db');
    let { personId } = req.params;
    let person = people.find(p => p.id === personId);
    try {
        if (person) {
            //let { id, ...updateData } = await personSchema.validateAsync({ id: personId, ...req.body });
            let updatedPeople = people.map(person =>
                person.id === personId
                    ? { ...person, ...req.body }
                    : person
            );
            req.app.set('db', updatedPeople);
            return res.status(200).json({ message: "update success" });
        } else {

            const err = new Error(`person with ID ${personId} not found `);
            next(err)
        }
    }
    catch (err) {
        console.log(err)
        next(Error(err))
    }
}

//delete person
exports.deletePerson = async (req, res, next) => {
    //const tableName = "Person"
    const people = req.app.get('db');
    const { personId } = req.params
    try {
        //await supabaseAxios.delete(`/${tableName}?id=eq.${personId}`);
        const personIndex = people.findIndex(p => p.id === personId);
        if (personIndex !== -1) {
            people.splice(personIndex, 1);
            return res.status(200).json({ message: "delete succesfully" });
        } else {
            const err = new Error(`person with ID ${personId} not found`);
            next(err)
        }

    } catch (error) {
        next(Error("Internal Server Error"))
        // return res.status(500).json({ error: 'Internal Server Error' });
    }
};





const Joi = require('joi');

const personSchema = Joi.object({
    id: Joi.string().uuid().required(),
    name: Joi.string().required(),
    age: Joi.number().integer().min(0).max(120).required(),
    hobbies: Joi.array().items(Joi.string()).required()
})

module.exports = personSchema
// let persons = [{
//     id: '1',
//     name: 'Sam',
//     age: '26',
//     hobbies: []
// }] //This is your in memory database
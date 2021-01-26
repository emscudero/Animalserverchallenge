const express = require('express');
const router = express.Router();
const sequelize = require('../db');
//const animal = require('../models/animal');
const Animal = sequelize.import('../models/animal');
const validateSession = require('../middleware/validate-session')

router.post('/create', validateSession, (req, res) => {
const newAnimal = {
    name: req.body.name,
    legNumber: req.body.legNumber,
    predator: req.body.predator,
    userId: req.user.id
}

Animal.create(newAnimal)
.then(animal => {
    res.status(200).json({
        animal: animal,
        message: "Animal is successfully created!"
    });
})
.catch(err => res.status(500).json({error: err}));
});


router.get('/', (req, res) => {
    Animal.findAll( {
        where: {
            userId: req.user.id
        }
    })
    .then(animal => res.status(200).json(animal))
    .catch(err => res.status(500).json({error:err}))
} );


router.delete("/:id", validateSession, (req, res) => {
    const query = { where: { name: req.params.name}};

    Animal.destroy(query)
.then(() => res.status(200).json({message: "Animal successfully deleted!"}))
    .catch((err) => res.status(500).json({message: 'Failed to delete', error:err}))
})

router.put('/update/:id', validateSession, (req, res) => {
    Animal.update(req.body, {
        where: {
            id: req.params.id,
            userId: req.user.id
        }
    })
.then(animal => res.status(200).json(animal))
.catch(err => res.status(500).json({ error: err }))


    /*Animal.update(updateJournalEntry, query)
    .then((animals) => res.status(200).json({message: "Successfully updated"}))
    .catch(err => res.status(500).json({error:err}));*/

})




module.exports = router;
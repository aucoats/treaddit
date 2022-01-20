const router = require('express').Router();
const { Trail, User } = require('../../models');

router.get('/', (req, res) => {
    Trail.findAll({
        attributes: [
            'id',
            'name',
            'length',
            'dog_friendly',
            'bike_friendly',
            'difficulty'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbTrailData => res.json(dbTrailData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Trail.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name',
            'length',
            'dog_friendly',
            'bike_friendly',
            'difficulty'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbTrailData => {
        if(!dbTrailData) {
            res.status(404).json({message: 'No trail found with this id'})
            return;
        }
        res.json(dbTrailData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Trail.create({
        name: req.body.name,
        length: req.body.length,
        dog_friendly: req.body.dog_friendly,
        difficulty: req.body.difficulty
    })
    .then(dbTrailData => res.json(dbTrailData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
    Trail.update(
        {
            name: req.body.name,
            length: req.body.length,
            dog_friendly: req.body.dog_friendly,
            bike_friendly: req.body.bike_friendly,
            difficulty: req.body.difficulty
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbTrailData => {
        if(!dbTrailData) {
            res.status(404).json({ message: 'No Trail found with this id' });
            return;
        }
        res.json(dbTrailData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Trail.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbTrailData => {
        if (!dbTrailData) {
            res.status(404).json({ message: 'No trail found with this id!' });
            return;
        }
        res.json(dbTrailData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
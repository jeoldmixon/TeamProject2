const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Search, User } = require('../../models');

router.get('/', (req, res) => {
    Search.findAll({
        attributes: [
            'id',
            'url',
            'company_name',
            'title',
            'salary',
            'location'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbSearchData => res.json(dbSearchData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Search.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'url',
            'company_name',
            'title',
            'salary',
            'location'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbSearchData => {
            if (!dbSearchData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbSearchData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    Search.create({
        title: req.body.title,
        url: req.body.url,
        company_name: req.body.company_name,
        salary: req.body.salary,
        location: req.body.location,
        user_id: req.session.user_id
    })
        .then(dbSearchData => res.json(dbSearchData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
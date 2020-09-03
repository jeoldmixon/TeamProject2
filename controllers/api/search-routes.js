const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Search, User } = require('../../models');
const fetch = require('node-fetch');
require('dotenv').config();

router.get('/', (req, res) => {
    Search.findAll({
        attributes: [
            'id',
            'url',
            'company_name',
            'title',
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


router.post('/', (req, res) => {
    fetch(`https://www.themuse.com/api/public/jobs?category=Engineering&level=Entry%20Level&level=Mid%20Level&location=${req.body.city}&page=1&api_key=${process.env.MUSE_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            let jobArr = data.results;
            jobArr.forEach((job) => {
                Search.create({
                    title: job.name,
                    url: job.refs.landing_page,
                    company_name: job.company.name,
                    location: job.locations[0].name,
                    user_id: req.session.user_id
                })
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
    })    
});

module.exports = router;

// router.get('/:id', (req, res) => {
//     Search.findOne({
//         where: {
//             id: req.params.id
//         },
//         attributes: [
//             'id',
//             'url',
//             'company_name',
//             'title',
//             'location'
//         ],
//         include: [
//             {
//                 model: User,
//                 attributes: ['username']
//             }
//         ]
//     })
//         .then(dbSearchData => {
//             if (!dbSearchData) {
//                 res.status(404).json({ message: 'No job found with this id' });
//                 return;
//             }
//             res.json(dbSearchData);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Search, User } = require('../../models');
const fetch = require('node-fetch');
require('dotenv').config();
const joobleKey = process.env.JOOBLE_API_KEY;
const axios = require("axios");

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
    const URL = `https://jooble.org/api/${joobleKey}`;
    axios
        .post(URL, {
            keywords: "manager",
            location: "Atlanta",
            // radius: "25",
            // salary: "100000",
            page: "1"
        })
        .then(function (answer) {
            let jobArr = answer.data.jobs;
            jobArr.forEach((job) => {
                Search.create({
                    title: job.title,
                    url: job.link,
                    company_name: job.company,
                    salary: job.salary,
                    location: job.location,
                    user_id: 1
                })
                    .then(dbSearchData => res.json(dbSearchData))
                    .catch(err => {
                        console.log(err);
                        res.status(500).json(err);
                    });
            });
        })
        // .catch(function (err) {
        //     res.json("hello!");
        // });
});


// router.get('/api/jobs', (req, res) => {
//     // include user/username
//     Search.findAll({})
//     .then(dbSearchData => {res.json(dbSearchData)})
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// })

// router.post('/api/jobs', (req, res) => {
//     console.log(req.body)
//     Search.create({
//         url: req.body.url,
//         company_name: req.body.company_name,
//         title: req.body.title,
//         salary: req.body.salary,
//         location: req.body.location,
//         user_id: req.body.user_id
//     }).then(dbSearchData => res.json(dbSearchData))
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });
module.exports = router;
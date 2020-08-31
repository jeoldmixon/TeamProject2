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
    fetch('https://www.themuse.com/api/public/jobs?page=2&api_key='+process.env.MUSE_API_KEY)
        .then(response => response.json())
        .then(data => {
            let jobArr = data.results;
            jobArr.forEach((job) => {
                let currentJob = {
                    title: job.name,
                    url: job.refs.landing_page,
                    company_name: job.company.name,
                    salary: null,
                    location: job.locations[0].name,
                    user_id: 1
                }
                bothJobsArr.push(currentJob)
                
            });
        })
        .then(() => {
            fetch('https://www.themuse.com/api/public/jobs?page=1&api_key='+process.env.MUSE_API_KEY)
            .then(response => response.json())
            .then(data => {
                let jobArr = data.results;
                jobArr.forEach((job) => {
                    let currentJob = {
                        title: job.name,
                        url: job.refs.landing_page,
                        company_name: job.company.name,
                        salary: null,
                        location: job.locations[0].name,
                        user_id: 2
                    }
                    bothJobsArr.push(currentJob)
                });
            })
        })
        .then(()=> {
            bothJobsArr.forEach(job => {
                let { title, url, company_name, salary, location, user_id } = job 
                Search.create({
                    title: title,
                    url: url,
                    company_name: company_name,
                    salary: salary,
                    location: location,
                    user_id: user_id
                })
                    .then(dbSearchData => res.json(dbSearchData))
                    .catch(err => {
                        console.log(err);
                        res.status(500).json(err);
                    });
            })
        })
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
    // });'


    // router.post('/', (req, res) => {
    //     bothJobsArr = []
    //     fetch('https://www.themuse.com/api/public/jobs?page=2&api_key='+process.env.MUSE_API_KEY)
    //         .then(response => response.json())
    //         .then(data => {
    //             let jobArr = data.results;
    //             jobArr.forEach((job) => {
    //                 Search.create({
    //                     title: job.name,
    //                     url: job.refs.landing_page,
    //                     company_name: job.company.name,
    //                     salary: null,
    //                     location: job.locations[0].name,
    //                     user_id: 1
    //                 })
    //                     .then(dbSearchData => res.json(dbSearchData))
    //                     .catch(err => {
    //                         console.log(err);
    //                         res.status(500).json(err);
    //                     });
    //             });
    //         }).then(() => {
    //     fetch('https://www.themuse.com/api/public/jobs?page=1&api_key='+process.env.MUSE_API_KEY)
    //         .then(response => response.json())
    //         .then(data => {
    //             let jobArr = data.results;
    //             jobArr.forEach((job) => {
    //                 Search.create({
    //                     title: job.name,
    //                     url: job.refs.landing_page,
    //                     company_name: job.company.name,
    //                     salary: null,
    //                     location: job.locations[0].name,
    //                     user_id: 1
    //                 })
    //                     .then(dbSearchData => res.json(dbSearchData))
    //                     .catch(err => {
    //                         console.log(err);
    //                         res.status(500).json(err);
    //                     });
    //             });
    //         });
    //     });
    // });


module.exports = router;
const router = require('express').Router();
// const sequelize = require('../config/connection');
const { Search, User } = require('../models');

// router.get('/', (req, res) => {
//     Search.findAll({
//         attributes: [
//             'id',
//             'url',
//             'company_name',
//             'title',
//             'salary',
//             'location'
//         ],
//         include: [
//             {
//                 model: User,
//                 attributes: ['username']
//             }
//         ]
//     })
//         .then(dbSearchData => res.json(dbSearchData))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// router.get('/login', (req, res) => {
//     if (req.session.loggedIn) {
//         res.redirect('/');
//         return;
//     }
    
//     res.render('login');
// });

// router.get('/signup', (req, res) => {
// 	if (req.session.loggedIn) {
// 		res.redirect('/');
// 		return;
// 	}
	
// 	res.render('signup');
// });

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
//             'salary',
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
//                 res.status(404).json({ message: 'No post found with this id' });
//                 return;
//             }
//             res.json(dbSearchData);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

router.get('/api/jobs', (req, res) => {
    // include user/username
    Search.findAll({})
    .then(dbSearchData => {res.json(dbSearchData)})
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.post('/api/jobs', (req, res) => {
    Search.create({
        url: req.body.url,
        company_name: req.body.company_name,
        title: req.body.title,
        salary: req.body.salary,
        location: req.body.location,
        user_id: req.body.user_id
    }).then(dbSearchData => res.json(dbSearchData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;
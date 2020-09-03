const router = require('express').Router();
// const sequelize = require('../config/connection');
const { Search, User } = require('../models');

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

router.get('/dashboard', (req, res) => {
  Search.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: ['id', 'url', 'company_name', 'title', 'location'],
  })
  .then(dbSearchData => {
    const searches = dbSearchData.map(search => search.get({ plain: true }));

    
    res.render('dashboard', { searches, loggedIn: true });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err)
  });
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

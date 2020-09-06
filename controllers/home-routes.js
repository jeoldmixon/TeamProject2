const router = require('express').Router();
const { Search } = require('../models');
const { withAuth, loggedIn } = require('../utils/auth')

// localhost:3001/    this is the homepage
router.get('/', loggedIn, (req, res) => {
  res.render('homepage');
});

// localhost:3001/login
router.get('/login', loggedIn, (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// localhost:3001/signup
router.get('/signup', loggedIn, (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

// localhost:3001/dashboard
router.get('/dashboard', withAuth, (req, res) => {
  Search.findAll({
    // orders all the jobs first by favorite and then by id
    order: [
      ['favorite', 'DESC'],
      ['id', 'DESC']
  ],
    where: {
      user_id: req.session.user_id
    },
    attributes: ['id', 'url', 'company_name', 'title', 'favorite', 'location'],
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
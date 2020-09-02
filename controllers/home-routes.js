const router = require("express").Router();
// const sequelize = require('../config/connection');
const { Search, User } = require("../models");

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

router.get("/dashboard", (req, res) => {
  // Search.findAll({
  //   attributes: ["id", "url", "company_name", "title", "location"],
  // });
  res.render("dashboard");
  // .then((dbSearchData) => res.json(dbSearchData))
  // .catch((err) => {
  //   console.log(err);
  //   res.status(500).json(err);
  // });
});

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

//

module.exports = router;

const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Search, User } = require("../../models");
const axios = require("axios");
const joobleKey = process.env.JOOBLE_API_KEY;
const fetch = require("node-fetch");
require("dotenv").config();

router.get("/", (req, res) => {
  Search.findAll({
    attributes: ["id", "url", "company_name", "title", "location"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbSearchData) => res.json(dbSearchData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  const URL = `https://jooble.org/api/${joobleKey}`;
  axios
    .post(URL, {
      keywords: "developer",
      location: req.body.city,
      page: "1",
    })
    .then(function (answer) {
      console.log(answer.data.jobs);
      let jobArr = answer.data.jobs;
      jobArr.forEach((job) => {
        Search.create({
          title: job.title,
          url: job.link,
          company_name: job.company,
          location: job.location,
          user_id: req.session.user_id
        }).catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
      });
    });
});

module.exports = router;

// router.get("/:id", (req, res) => {
  //   Search.findOne({
  //     where: {
  //       id: req.params.id,
  //     },
  //     attributes: ["id", "url", "company_name", "title", "location"],
  //     include: [
  //       {
  //         model: User,
  //         attributes: ["username"],
  //       },
  //     ],
  //   })
  //     .then((dbSearchData) => {
  //       if (!dbSearchData) {
  //         res.status(404).json({ message: "No post found with this id" });
  //         return;
  //       }
  //       res.json(dbSearchData);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  // });

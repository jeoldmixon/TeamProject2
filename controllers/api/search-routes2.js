const router = require("express").Router();
const { Search } = require("../../models");
const axios = require("axios");
const joobleKey = process.env.JOOBLE_API_KEY;
require("dotenv").config();

// api/search2
router.post("/", (req, res) => {
  const URL = `https://jooble.org/api/${joobleKey}`;
  axios
    .post(URL, {
      keywords: "developer",
      location: req.body.city,
      page: "1",
    })
    .then(function (answer) {
      let jobArr = answer.data.jobs;
      jobArr.forEach((job) => {
        Search.create({
          title: job.title,
          url: job.link,
          company_name: job.company,
          location: job.location,
          favorite: 0,
          user_id: req.session.user_id
        })
      })
    }).then(dbSearchData => res.json(dbSearchData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
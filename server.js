const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const fetch = require('node-fetch');
require('dotenv').config();
const joobleKey = process.env.JOOBLE_API_KEY;
const { Search, User } = require('./models');


const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

app.use(routes);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

const axios = require("axios");

app.get("/test", function (req, res) {
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
      answer.data.json();
    })
    .then(data => {
      let jobArr = data.results;
      jobArr.forEach((job) => {
        Search.create({
          title: job.title,
          url: job.link,
          company_name: job.company,
          salary: job.salary,
          location: job.location,
          user_id: 3
        })
          .then(dbSearchData => res.json(dbSearchData))
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      });
    })
    .catch(function (err) {
      res.json("hello!");
    });
});

// app.get('/test', (req, res) => { fetch(`https://jooble.org/api/${joobleKey}`)
//   .then(response => response.json())
//   .then(data => {
//     res.json(data.results)
//     let jobArr = data.results;
//     // jobArr.forEach((job) => {
//     //   // console.log(`title: ${job.name}, company: ${job.company.name} location: ${job.locations[0].name}, url: ${job.refs.landing_page}`)
//     //   // postJobs(job.name, job.company.name, job.locations[0].name, job.refs.landing_page)
//     // })
//     document.location.reload();
//   })
// })
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const fetch = require('node-fetch');
require('dotenv').config();
const joobleKey = process.env.JOOBLE_API_KEY;
const axios = require("axios");
const { Search } = require('./models');



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

app.get("/test", function (req, res) {
  const URL = `https://jooble.org/api/${joobleKey}`;
  axios
    .post(URL, {
      keywords: "manager",
      location: "Atlanta",
      radius: "25",
      salary: "100000",
      page: "1"
    })
    .then(function (dbSearchData) {
      console.log(dbSearchData.data.jobs);
      res.json(dbSearchData.data);
    })
    .catch(function (err) {
      res.json("hello!");
    });
});
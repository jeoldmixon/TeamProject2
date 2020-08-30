const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const fetch = require('node-fetch');
const Search = require('./models/Search')
const postJobs = require('./public/javascript/getjobs')
require('dotenv').config();

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



app.get('/test', (req, res) => { fetch('https://www.themuse.com/api/public/jobs?page=2&api_key='+process.env.MUSE_API_KEY)
  .then(response => response.json())
  .then(data => {
    // res.json(data.results)
    let jobArr = data.results;
    jobArr.forEach((job) => {
      // console.log(`title: ${job.name}, company: ${job.company.name} location: ${job.locations[0].name}, url: ${job.refs.landing_page}`)
      postJobs(job.name, job.company.name, job.locations[0].name, job.refs.landing_page)
    })
    document.location.reload();
  })
})


  // name job.locations.name job.refs.landing_page job.company.name



const fetch = require('node-fetch');
require('dotenv').config();
app.get('/test', (req, res) => { fetch('https://www.themuse.com/api/public/jobs?page=10&api_key='+process.env.MUSE_API_KEY)
  .then(response => response.json())
  .then(data => data.forEach(console.log('I did it')))
})
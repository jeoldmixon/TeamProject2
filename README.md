## gitDevJob

An application to keep job hunting from becoming a full-time job.

## Submission Links

GitHub:

https://github.com/jeoldmixon/TeamProject2

Heroku:

https://secret-journey-15196.herokuapp.com/

## Mock-Up

[Screen Shot of Dashboard](./public/images/image.png)

## User Story

AS A developer
I WANT to be able to search multiple job sites
SO THAT I can browse multiple jobs without having to create multiple logins.
I WANT to be able to save favorite jobs
SO THAT I can apply for them without having to apply immediately.

## Acceptance Criteria

GIVEN a functional Node and Express.js API
THAT uses MVC paradigm and can GET and POST routes for retreving and adding new data
WHEN I add my database name, MySQL username / password, and API keys to an environment variable file
THAT application includes user authentication (express-session and cookies) and a new npm called Password Validator
THEN I am able to connect to a database using Sequelize that maintains user accounts using authentication
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
THEN I am able to test API calls from various external sources
THEN using Handlebars as the template engine I can
LASTLY deploy to HEROKU for end users to access

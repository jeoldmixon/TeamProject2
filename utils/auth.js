// If not logged in and trying to access a page that they should not then they are redirected to the login page.
const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
};

// If user is already logged, they are redirected to the Dashboard.
const loggedIn = (req, res, next) => {
    if (req.session.user_id) {
        res.redirect('/dashboard');
    } else {
        next();
    }
};

module.exports = { withAuth, loggedIn };
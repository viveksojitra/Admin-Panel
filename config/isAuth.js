const isAuthenticated = (req, res, next) => {

    if (req.isAuthenticated()) {
        console.log("User authenticated:", req.user);
        return next();
    }

    console.log("User not authenticated");
    res.redirect('/signin');
};


module.exports = isAuthenticated;
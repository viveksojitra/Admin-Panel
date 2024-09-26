const isAuthenticated = (req, res, next) => {

    if (req.isAuthenticated()) {
        console.log("Authenticated user:", req.user);
        return next();
    }

    console.log("User not authenticated");
    res.redirect('/signin');
};


module.exports = isAuthenticated;
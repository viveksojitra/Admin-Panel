const User = require('../model/userModel');
// const fs = require('fs');
// const path = require('path');

// Dashboard
const dashboardController = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.cookies.userId }).select('name');

        if (!user) {
            return res.redirect('/signup');
        }

        res.render('dashboard', { username: user.name });
    } catch (err) {
        console.error('Error loading dashboard:', err);
    }
};

// Profile
const profileController = (req, res) => {
    res.render('profile');
}

module.exports = {
    dashboardController,
    profileController,
}
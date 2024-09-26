const express = require('express');
const router = express.Router();
// const filesController = require('../controllers/filesController');
// const upload = require('../multer_config/mConfig');
const cookieController = require('../controllers/cookieController');
const passport = require('../config/passport.js')
const controllers = require('../controllers/userController');
const isAuthenticated = require('../config/isAuth');

// // Routes
// router.get('/', filesController.getHomePage);
// router.post('/upload', upload.single('file'), filesController.uploadFile);
// router.get('/edit/:id', filesController.getEditFilePage);
// router.post('/edit/:id', upload.single('file'), filesController.updateFileDetails);
// router.get('/delete/:id', filesController.deleteFile);

// module.exports = router;


// Default route
router.get('/', controllers.defaultController);

// User routes
router.get('/signup', controllers.registerController);
router.post('/signupPost', controllers.registerPostController);
router.get('/signin', controllers.loginController);

router.post('/signinPost', passport.authenticate('local', { failureRedirect: '/signin' }), controllers.loginPostController);

router.get('/logout', controllers.logoutController);

// User Profile
router.get('/dashboard', isAuthenticated, controllers.dashboardController);
router.get('/profile', isAuthenticated, controllers.profileController);

// Cookie routes
router.get('/setcookie', cookieController.setCookie);
router.get('/getcookie', cookieController.getCookie);
router.get('/clearcookie', cookieController.clearCookie);


module.exports = router;

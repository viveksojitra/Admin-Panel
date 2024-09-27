const express = require('express');
const router = express.Router();
// const filesController = require('../controllers/filesController');
// const upload = require('../multer_config/mConfig');
const cookieController = require('../controllers/cookieController');
const authControllers = require('../controllers/authController');
const userControllers = require('../controllers/userController');
const passport = require('../config/passport.js');
const isAuthenticated = require('../config/isAuth');

// // Routes
// router.get('/', filesController.getHomePage);
// router.post('/upload', upload.single('file'), filesController.uploadFile);
// router.get('/edit/:id', filesController.getEditFilePage);
// router.post('/edit/:id', upload.single('file'), filesController.updateFileDetails);
// router.get('/delete/:id', filesController.deleteFile);

// module.exports = router;

// Default route
router.get('/', authControllers.defaultController);

// Auth routes
router.get('/signup', authControllers.registerController);
router.post('/signupPost', authControllers.registerPostController);
router.get('/signin', authControllers.loginController);
router.post('/signinPost', passport.authenticate('local', { failureRedirect: '/signin' }), authControllers.loginPostController);
router.get('/logout', authControllers.logoutController);

// User routes
router.get('/profile', isAuthenticated, userControllers.profileController);
router.get('/dashboard', isAuthenticated, userControllers.dashboardController);

// Cookie routes
router.get('/setcookie', cookieController.setCookie);
router.get('/getcookie', cookieController.getCookie);
router.get('/clearcookie', cookieController.clearCookie);

module.exports = router;

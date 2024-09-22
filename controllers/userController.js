const User = require('../model/userModel');
// const fs = require('fs');
// const path = require('path');
const cookieController = require('./cookieController');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// // Render the home page
// exports.getHomePage = async (req, res) => {
//   try {
//     const files = await File.find({});
//     res.render('index', { files });
//   } catch (error) {
//     console.error('Error fetching files:', error);
//   }
// };

// // Handle file upload
// exports.uploadFile = async (req, res) => {
//   try {
//     const filetype = req.file.mimetype;
//     const newFile = new File({
//       filename: req.file.filename,
//       filepath: `storage/${req.file.filename}`,
//       filetype: filetype
//     });
//     await newFile.save();
//     res.redirect('/');
//   } catch (error) {
//     console.error('Error uploading file:', error);
//   }
// };


// // Render the edit page
// exports.getEditFilePage = async (req, res) => {
//   try {
//     const file = await File.findById(req.params.id);
//     res.render('edit', { file });
//   } catch (error) {
//     console.error('Error fetching file:', error);
//   }
// };

// // Handle file details update
// exports.updateFileDetails = async (req, res) => {
//   try {
//     const fileId = req.params.id;
//     const { filename } = req.body;

//     const file = await File.findById(fileId);

//     // If a new file is uploaded
//     if (req.file) {
//       // Delete old file from storage
//       fs.unlink(path.join(__dirname, '..', 'storage', file.filename), (err) => {
//         if (err) {
//           console.error('Failed to delete old file:', err);
//         }
//       });

//       // Update file details with new file
//       file.filename = req.file.filename;
//       file.filepath = `storage/${req.file.filename}`;
//     }

//     // Update filename in any case
//     file.filename = filename;

//     await file.save();

//     res.redirect('/');
//   } catch (err) {
//     console.error('Error updating file:', err);
//   }
// };

// // Handle file deletion
// exports.deleteFile = async (req, res) => {
//   try {
//     const file = await File.findById(req.params.id);
//     const filePath = path.join(__dirname, '..', file.filepath);

//     // Delete file from storage
//     fs.unlink(filePath, (err) => {
//       if (err) {
//         console.error('Error deleting file:', err);
//       }
//     });

//     // Delete file from the database
//     await File.findByIdAndDelete(req.params.id);
//     res.redirect('/');
//   } catch (error) {
//     console.error('Error deleting file:', error);
//   }
// };

// DEFAULT CONTROLLER
const defaultController = (req, res) => {
  try {
    if (!req.cookies.userId) {

      return res.redirect('/signup');

    } else {

      return res.render('dashboard', { username: req.cookies.username });
    }
  } catch (err) {
    console.error('Error loading dashboard:', err);
  }
};

// USER CONTROLLERS/
// Register controller
const registerController = (req, res) => {
  return res.render('sign-up');
};


const registerPostController = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Check if all fields are provided
  if (!name || !email || !password || !confirmPassword) {
    return res.redirect('/signup');
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.redirect('/signup');
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {

    console.log('User already exists!');
    return res.redirect('/signup');
  }

  try {
    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    const userId = newUser._id.toString();
    const username = newUser.name;
    res.cookie('userId', userId);
    res.cookie('username', username);

    // Set cookie
    cookieController.setCookie(req, res, userId, username);

    console.log('User has been registered!');
    return res.redirect('/signin');

  } catch (error) {
    return res.redirect('/signup');
  }
};

// Login controller
const loginController = (req, res) => {
  return res.render('sign-in');
}

// Login post controller
const loginPostController = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    console.log('Email and password are required');
    return res.redirect('/signin');
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      console.log('User does not exist! Please Register First.');
      return res.redirect('/signup');
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    // Check if passwords match
    if (!isMatch) {
      console.log('Incorrect password!');
      return res.redirect('/signin');
    }

    // Set cookie with user ID
    const userId = user._id.toString();
    const username = user.name;
    res.cookie('userId', userId);
    res.cookie('username', username);

    // Set cookie
    cookieController.setCookie(req, res, userId, username);

    // Redirect to dashboard
    console.log('User logged in successfully:', user);
    res.redirect('/');
  } catch (error) {
    console.log('Error logging in user:', error);
    res.redirect('/signin');
  }
}

// Logout controller
const logoutController = (req, res) => {
  res.clearCookie('userId');
  res.redirect('/signin');

  console.log('User has been logged out!');
}

// User Profile
const dashboardController = (req, res) => {
  res.render('dashboard', { username: req.cookies.username });
}

const profileController = (req, res) => {
  res.render('profile');
}

module.exports = {
  defaultController,
  registerController,
  registerPostController,
  loginController,
  loginPostController,
  profileController,
  logoutController,
  dashboardController
};

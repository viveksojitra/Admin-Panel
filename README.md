# 🛠️ Admin-Panel Website

A robust Admin-Panel Website designed to manage backend operations with ease. This project is built using Node.js, Express, MongoDB, and EJS, and showcases key features like user authentication, profile management, and a dynamic dashboard.

## 📑 Features

- **User Authentication:**
  - **Registration:** Users must register to access the admin panel.
  - **Sign-In:** Login is required to access and manage the admin panel.
  - **Logout:** Users can securely log out of the system.

- **Dashboard:**
  - A welcome message displaying the user's name is shown after login.
  - Future enhancements will include more widgets and analytics.

- **Profile Management:**
  - Users can manage their profiles and log out from this page.

- **Upcoming Features:**
  - Additional functionalities and enhancements will be added in future updates.

## 🎞 Demo Video

https://github.com/user-attachments/assets/69e98d78-8000-4760-9fa7-e718eb9395ff

## 🎥 Preview

_Preview images and videos of the project will be here._
![Registration]
![Registration](https://github.com/user-attachments/assets/9b779fd3-baa6-44b7-8cf1-27d565e98736)

![Sign-in]
![Signin](https://github.com/user-attachments/assets/582d92d0-dc6f-4203-ae00-2106ef095ada)

![Dashboard]
![Dashboard](https://github.com/user-attachments/assets/41654f3b-f55c-4f8f-8855-222c4b55cba3)

![Profile Page]
![Profile](https://github.com/user-attachments/assets/49dc3683-95a8-4c86-a72f-82805e0e3d74)


## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Frontend:** EJS, Bootstrap 5
- **File Uploads:** Multer [ will implemented soon ].
- **Dev Tools:** Nodemon, Body-parser

## 📦 Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/viveksojitra/admin-panel.git
    ```
2. Navigate to the project directory:
    ```bash
    cd admin-panel
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the server:
    ```bash
    npm start
    ```
5. Open your browser and go to `http://localhost:3002` to access the admin panel.

## 📂 Project Structure

```bash
admin-panel/
│
├── assets/           # All the necessary resources.
├── config/           # Configuration files (e.g., for Multer, MongoDB)
├── controllers/      # Request handlers and business logic
├── models/           # Mongoose schemas
├── public/           # Static files (CSS, images)
├── routes/           # Express routes
├── views/            # EJS templates for rendering pages
├── uploads/          # Uploaded files (e.g., user profile images)
├── index.js          # Main entry point of the app
├── package.json      # Project dependencies and scripts
└── README.md         # Project documentation

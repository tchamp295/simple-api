// controllers/userController.js
const fs = require("fs");
const path = require("path");
const users = require("../data/users");

// Get all users
const getUsers = (req, res) => {
  if (users && users.length > 0) {
    res.status(200).json({
      message: "Users retrieved successfully",
      users: users,
    });
  } else {
    res.status(404).json({
      error: "No users found",
    });
  }
};

// Add a new user and save to file
const addUser = (req, res) => {
  const { name, email, phone } = req.body;

  // Check for missing fields
  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ error: "Name, email, and phone are required" });
  }

  // Check if the email already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res
      .status(409)
      .json({ error: "User with this email already exists" });
  }

  // Create a new user object
  const newUser = { id: users.length + 1, name, email, phone };
  users.push(newUser);

  // Write the updated users array to users.js file
  fs.writeFile(
    path.join(__dirname, "../data/users.js"),
    `const users = ${JSON.stringify(
      users,
      null,
      2
    )};\n\nmodule.exports = users;`,
    (err) => {
      if (err) {
        console.error("Failed to update users file", err);
        return res.status(500).json({ error: "Failed to save user data" });
      }

      // Success message
      res.status(201).json({
        message: "User added successfully",
        user: newUser,
      });
    }
  );
};

module.exports = { getUsers, addUser };

const { User } = require("../models");
const { signToken, comparePasswords } = require('../utils/auth');
const bcrypt = require('bcrypt');

const UserController = {
  // Retrieves all users from the database
  getAllUsers(req, res) {
    User.find({})
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  // Retrieves a single user by their ID
  getUserById(req, res) {
    User.findById(req.params.userId)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  // Creates a new user
  // createUser(req, res) {
  //   User.create(req.body)
  //     .then((userData) => res.json(userData))
  //     .catch((err) => res.status(500).json(err));
  // },
  createUser(req, res) {
    const { username, email, password } = req.body;

    bcrypt
      .hash(password, 10)
      .then((hashedPassword) => {
        return User.create({ username, email, password: hashedPassword });
      })
      .then((userData) => {
        const token = signToken(userData); // Use the signToken function to generate the token
        res.json({ user: userData, token });
      })
      .catch((err) => res.status(500).json(err));
  },

  // Logs a user in
  loginUser(req, res) {
    const { email, password } = req.body;

    User.findOne({ email })
      .then((userData) => {
        if (!userData) {
          return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare the provided password with the stored hashed password
        comparePasswords(password, userData.password)
          .then((isMatch) => {
            if (!isMatch) {
              return res
                .status(401)
                .json({ message: "Invalid email or password" });
            }

            // Password is correct, generate and send an authentication token
            const token = signToken(userData);
            res.json({ user: userData, token });
          })
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json(err));
  },

  // Updates a user by their ID
  updateUserById(req, res) {
    User.findOneAndUpdate(req.params.id, req.body, { new: true })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: "User not found" });
        } else {
          res.status(200).json(userData);
        }
      })
      .catch((err) => res.status(400).json(err));
  },

  // Deletes a user by their ID
  deleteUserById(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: "User not found" });
        } else {
          res.json({ messsage: "User successfully deleted" });
        }
      })
      .catch((err) => res.status(500).json(err));
  },

  // Adds a friend to a user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          return res.status(400).json({ message: "User not found" });
        } else {
          res.json(userData);
        }
      })
      .catch((err) => res.status(500).json(err));
  },

  // Removes a friend from a user's friend list
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "User not found" });
        }

        const removed = !dbUserData.friends.includes(req.params.friendId);
        if (removed) {
          res
            .status(200)
            .json({ message: "Friend removed successfully", dbUserData });
        } else {
          res.json(dbUserData);
        }
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = UserController;

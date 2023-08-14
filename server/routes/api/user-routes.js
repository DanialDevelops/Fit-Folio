const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");

// Routes to view or create users
router.route("/").get(getAllUsers).post(createUser);

// Routes to view, update, or delete a user
router
  .route("/:userId")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

// Routes to add or remove friends
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;

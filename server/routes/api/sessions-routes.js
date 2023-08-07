const router = require("express").Router();

const {
  getAllSessions,
  getSessionById,
  createSession,
  deleteSession,
  updateSessionById,
  createReaction,
  deleteWorkout,
} = require("../../controllers/sessions-controller");

// Routes for viewing and creating thoughts
router.route("/").get(getAllSessions).post(createSession);

// Routes to view, modify, or delete a thought
router
  .route("/:sessionId")
  .get(getSessionById)
  .put(updateSessionById)
  .delete(deleteSession);

// Route for creating reaction
router.route("/:sessionId/resistance").post(createReaction);

// Route to delete reaction
router.route("/:sessionId/resistance/:resistanceId").delete(deleteWorkout);

module.exports = router;

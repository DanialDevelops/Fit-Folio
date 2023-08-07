const router = require("express").Router();

const {
  getAllSessions,
  getSessionById,
  createSession,
  deleteSession,
  updateSessionById,
  createWorkout,
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
router.route("/:sessionId/workout").post(createWorkout);

// Route to delete reaction
router.route("/:sessionId/workout/:workoutId").delete(deleteWorkout);

module.exports = router;

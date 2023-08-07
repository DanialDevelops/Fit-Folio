const { Sessions, User, Reaction } = require("../models");
const { Types } = require("mongoose");

const SessionsController = {
  // Retrieves all thoughts from the database
  async getAllSessions(req, res) {
    try {
      const sessions = await Sessions.find({});
      res.json(sessions);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Retrieves a single thought by its ID
  async getSessionById(req, res) {
    try {
      const sessions = await Sessions.findOne({ _id: req.params.sessionId });
      if (!sessions) {
        res.status(404).json({ message: "Session not found" });
      } else {
        res.status(200).json(sessions);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Creates a new thought
  async createSession(req, res) {
    try {
      const sessions = await Sessions.create(req.body);
      res.status(200).json(sessions);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Deletes a thought by its ID
  async deleteSession(req, res) {
    try {
      const sessions = await Sessions.findByIdAndDelete({
        _id: req.params.sessionId,
      });
      res.status(200).json(sessions);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Updates a thought by its ID
  async updateSessionById(req, res) {
    try {
      const sessions = await Sessions.findByIdAndUpdate(
        req.params.sessionId,
        req.body,
        { new: true }
      );
      if (!sessions) {
        res.status(400).json({ message: "Thought not found" });
      } else {
        res.status(200).json(sessions);
      }
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Creates a new reaction for a thought
  async createReaction(req, res) {
    try {
      const sessions = await Sessions.findOneAndUpdate(
        { _id: req.params.sessionId },
        { $addToSet: { resistance: req.body } },
        { runValidators: true, new: true }
      );
      if (!sessions) {
        res.status(400).json({ message: "Session not found" });
      } else {
        res.status(200).json(sessions);
      }
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Deletes a reaction from a thought
  async deleteWorkout(req, res) {
    try {
      const sessions = await Sessions.findOneAndUpdate(
        { _id: req.params.sessionId },
        { $pull: { resistance: { resistanceId: req.params.resistanceId } } },
        { runValidators: true, new: true }
      );

      if (!sessions) {
        res.status(400).json({ message: "Thought not found" });
      } else {
        res.status(200).json(sessions);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = SessionsController;

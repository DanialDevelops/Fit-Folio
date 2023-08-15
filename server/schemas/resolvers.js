const { AuthenticationError } = require("apollo-server-express");
const { User, CardioWorkout, WeightWorkout } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("cardioWorkouts weightWorkouts");
    },
    user: async (_, { username }) => {
      return User.findOne({ username }).populate(
        "cardioWorkouts weightWorkouts"
      );
    },
  },
  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    addCardioWorkout: async (_, { workoutName, distance, date }, context) => {
      if (context.user) {
        const cardioWorkout = await CardioWorkout.create({
        user: context.user._id, // Use context.user._id instead of userId
        workoutName,
        distance,
        date,
      });

      await User.findByIdAndUpdate(context.user._id, {
        $push: { cardioWorkouts: cardioWorkout._id },
      });

      return cardioWorkout;
    }
    throw new AuthenticationError("You need to be logged in!");
  },

  addWeightWorkout: async (_, { sets, reps, weight }, context) => {
    if (context.user) {
      const weightWorkout = await WeightWorkout.create({
        user: context.user._id, // Use context.user._id instead of userId
        sets,
        reps,
        weight,
      });

      await User.findByIdAndUpdate(context.user._id, {
        $push: { weightWorkouts: weightWorkout._id },
      });

      return weightWorkout;
    }
    throw new AuthenticationError("You need to be logged in!");
  },
},
  User: {
    cardioWorkouts: async (parent) => {
      const user = await User.findById(parent._id).populate("cardioWorkouts");
      return user.cardioWorkouts;
    },
    weightWorkouts: async (parent) => {
      const user = await User.findById(parent._id).populate("weightWorkouts");
      return user.weightWorkouts;
    },
  },
};

module.exports = resolvers;

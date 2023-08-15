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

    addCardioWorkout: async (_, { userId, workoutData }, context) => {
      if (context.user) {
        const cardioWorkout = await CardioWorkout.create({
          user: userId,
          ...workoutData,
        });

        await User.findByIdAndUpdate(userId, {
          $push: { cardioWorkouts: cardioWorkout._id },
        });

        return cardioWorkout;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addWeightWorkout: async (_, { userId, workoutData }, context) => {
      if (context.user) {
        const weightWorkout = await WeightWorkout.create({
          user: userId,
          ...workoutData,
        });

        await User.findByIdAndUpdate(userId, {
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

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    cardioWorkouts: [CardioWorkout]
    weightWorkouts: [WeightWorkout]
  }

  type Auth {
    token: ID!
    user: User
  }

  type CardioWorkout {
    _id: ID!
    user: User!
    workoutName: String
    distance: String
    date: String
  }

  type WeightWorkout {
    _id: ID!
    user: User!
    sets: String
    reps: String
    weight: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addCardioWorkout(
      workoutName: String!
      distance: String!
      date: String!
    ): CardioWorkout
    addWeightWorkout(
      sets: String!
      reps: String!
      weight: String!
    ): WeightWorkout
  }
`;

module.exports = typeDefs;

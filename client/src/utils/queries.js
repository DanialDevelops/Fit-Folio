import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      cardioWorkouts {
        _id
        workoutName
        distance
        date
      }
      weightWorkouts {
        _id
        sets
        reps
        weight
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      cardioWorkouts {
        _id
        workoutName
        distance
        date
      }
      weightWorkouts {
        _id
        sets
        reps
        weight
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      cardioWorkouts {
        _id
        workoutName
        distance
        date
      }
      weightWorkouts {
        _id
        sets
        reps
        weight
      }
    }
  }
`;

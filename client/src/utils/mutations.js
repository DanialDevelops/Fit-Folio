import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_WEIGHTWORKOUT = gql`
  mutation addWeightWorkout(
    $sets: String!
    $reps: String!
    $weight: String!
  ) {
    addWeightWorkout(sets: $sets, reps: $reps, weight: $weight) {
      _id
      sets
      reps
      weight
    }
  }
`;

export const ADD_CARDIOWORKOUT = gql`
  mutation addCardioWorkout(
    $workoutName: String!
    $distance: String!
    $date: String!
  ) {
    addCardioWorkout(workoutName: $workoutName, distance: $distance, date: $date) {
      _id
      workoutName
      distance
      date
    }
  }
`;

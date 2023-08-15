import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      sessions {
        _id
        sessionText
        createdAt
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
      sessions {
        _id
        sessionText
        sessionAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_WORKOUT
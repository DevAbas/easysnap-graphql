const { gql } = require('apollo-boost');

export const CREATE_USER = gql`
  mutation($username: String!, $password: String!) {
    createUser(data: { username: $username, password: $password }) {
      token
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signInUser(data: { username: $username, password: $password }) {
      token
    }
  }
`;

export const ADD_SNAP = gql`
  mutation($text: String!, $user_id: ID!) {
    createSnap(data: { text: $text, user_id: $user_id }) {
      id
      text
      createdAt
      user {
        id
        username
        createdAt
      }
    }
  }
`;

export const GET_ACTIVE_USER = gql`
  query {
    activeUser {
      id
      username
    }
  }
`;

export const GET_SNAPS = gql`
  query {
    snaps {
      id
      text
      createdAt
      user {
        id
        username
        createdAt
      }
    }
  }
`;

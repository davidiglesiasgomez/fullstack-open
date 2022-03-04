import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
      }
      genres
      id
    }
    allGenres
  }
`

export const CREATE_BOOK = gql`
  mutation Mutation($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author {
        name
      }
      id
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation Mutation($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
      id
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const RECOMMENDATIONS = gql`
  query {
    me {
      favoriteGenre
    }
    allBooks {
      title
      published
      author {
        name
      }
      genres
    }
  }
`

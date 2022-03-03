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
      author
      id
    }
  }
`

export const CREATE_BOOK = gql`
  mutation Mutation($title: String!, $published: Int!, $genres: [String!]!, $author: String) {
    addBook(
      title: $title,
      published: $published,
      genres: $genres,
      author: $author
    ) {
      title
      published
      author
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
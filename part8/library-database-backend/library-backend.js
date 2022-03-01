const { ApolloServer, ApolloError, UserInputError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

const MONGODB_URI =
  process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }

`

const resolvers = {
  Query: {
    bookCount: () => async () => Book.collection.countDocuments(),
    authorCount: () => async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => await Book.find({}),
      // .filter(book => args.author === undefined ? true : book.author === args.author)
      // .filter(book => args.genre === undefined ? true : book.genres.find(g => g === args.genre)),
    allAuthors: async () => await Author.find({}),
  },
  Author: {
    bookCount: (root) => {
      return books.filter(book => book.author === root.name).length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (author === null) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new ApolloError('Error storing new author')
        }
      }

      let newBook = new Book({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres,
      })
      try {
        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      let returnedBook = await Book.findById(newBook._id).populate('author')
      return returnedBook
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author) {
        return null
      }
      authorEdited = { ...author, born: args.setBornTo }
      authors = authors.map(a => ( a.name === args.name ? authorEdited : a ))
      return authorEdited
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

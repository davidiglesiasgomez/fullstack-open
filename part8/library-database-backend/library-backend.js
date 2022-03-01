const { ApolloServer, ApolloError, gql } = require('apollo-server')
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
    allBooks: async (root, args) => {
      let filters = {}
      if (args.author !== undefined) {
        let author = await Author.findOne({ name: args.author })
        if (author === null) {
          return []
        }
        filters.author = author.id
      }
      if (args.genre !== undefined) {
        filters.genres = { $in: args.genre }
      }
      return await Book.find(filters).populate('author')
    },
    allAuthors: async () => await Author.find({}),
  },
  Author: {
    bookCount: (root) => {
      // return books.filter(book => book.author === root.name).length
      return 0
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
          throw new ApolloError('Error storing new author ' + error.message)
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
        throw new ApolloError('Error storing new book ' + error.message)
      }

      let returnedBook = await Book.findById(newBook._id).populate('author')
      return returnedBook
    },
    editAuthor: async (root, args) => {
      try {
        let author = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, {new: true})
      } catch (error) {
        throw new ApolloError('Error updating author ' + error.message)
      }
      return author
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

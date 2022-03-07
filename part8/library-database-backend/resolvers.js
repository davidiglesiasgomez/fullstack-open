const { UserInputError, AuthenticationError } = require('apollo-server')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_SECRET  = process.env.JWT_SECRET

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
    me: (root, args, context) => {
      return context.currentUser
    },
    allGenres: async () => {
      let books = await Book.find()
      let genres = books.reduce((temp, book) => temp.concat(book.genres), [])
      return [...new Set(genres)]
    }
  },
  Author: {
    bookCount: async (root) => {
      return await Book.where({ author: root.id }).count()
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated')
      }

      let author = await Author.findOne({ name: args.author })
      if (author === null) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError('Error storing new author ' + error.message)
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
        throw new UserInputError('Error storing new book ' + error.message)
      }

      let returnedBook = await Book.findById(newBook._id).populate('author')
      return returnedBook
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated')
      }
      try {
        await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, {new: true})
      } catch (error) {
        throw new UserInputError('Error updating author ' + error.message)
      }
      let returnedAuthor = await Author.findOne({ name: args.name })
      return returnedAuthor
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
        return user.save()
        .catch(error => {
          throw new UserInputError('Error creating user ' + error.message)
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError('Wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }
}

module.exports = resolvers
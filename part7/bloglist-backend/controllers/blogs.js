const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const { tokenExtractor, userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 }).populate('comments', { comment: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', tokenExtractor, userExtractor, async (request, response) => {
  if (!request.validToken) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = request.user

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    user: user._id
  })

  const newBlog = await blog.save()

  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()

  const returnedBlog = await Blog.findById(newBlog._id).populate('user', { username: 1, name: 1, id: 1 })

  response.status(201).json(returnedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', tokenExtractor, async (request, response) => {
  if (!request.validToken) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }
  if (blog.user.toString() !== request.decodedToken.id.toString()) {
    return response.status(401).end()
  }
  await Blog.deleteOne({_id: request.params.id})
  response.status(204).end()
})

blogsRouter.put('/:id', tokenExtractor, async (request, response) => {
  if (!request.validToken) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }
  if (blog.user.toString() !== request.decodedToken.id.toString()) {
    return response.status(401).end()
  }
  const updateBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: request.body.user
  }
  const updatedBlog = await Blog.findOneAndUpdate({_id: request.params.id}, updateBlog, { new: true, runValidators: true })
  if (!updatedBlog) {
    return response.status(404).end()
  }
  return response.json(updatedBlog)

})

blogsRouter.patch('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }
  const patch = {
    op: request.body.op,
    path: request.body.path,
    value: parseInt(request.body.value)
  }
  if (patch.op !== 'replace' || patch.path !== '/likes') {
    return response.status(405).end()
  }
  const updateBlog = {
    likes: patch.value
  }
  const updatedBlog = await Blog
    .findOneAndUpdate({_id: request.params.id}, updateBlog, { new: true, runValidators: true })
    .populate('user', { username: 1, name: 1, id: 1 })
    .populate('comments', { comment: 1, id: 1 })
  if (!updatedBlog) {
    return response.status(404).end()
  }
  return response.json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const comment = new Comment({
    comment: request.body.comment,
    blog: request.params.id
  })

  const newComment = await comment.save()

  const blog = await Blog.findById(request.params.id)
  blog.comments = blog.comments.concat(newComment._id)
  await blog.save()

  response.status(201).json(newComment)
})

module.exports = blogsRouter
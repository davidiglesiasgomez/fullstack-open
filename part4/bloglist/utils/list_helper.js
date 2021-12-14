const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => {return total+blog.likes}, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}
  let blog = blogs.reduce(function(previousBlog, currentBlog) {
    if (previousBlog.likes > currentBlog.likes) {
      return previousBlog
    } else {
      return currentBlog
    }
  })
  return {
    'title': blog.title,
    'author': blog.author,
    'likes': blog.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}
  let authors = {}
  let returnAuthor = ''
  let returnBlogs = 0
  for (let i=0; i<blogs.length; i++) {
    if (typeof authors[blogs[i].author] === 'undefined') {
      authors[blogs[i].author] = 0
    }
    authors[blogs[i].author]++
    if (authors[blogs[i].author] > returnBlogs) {
      returnAuthor = blogs[i].author
      returnBlogs = authors[blogs[i].author]
    }
  }
  return {
    'author': returnAuthor,
    'blogs': returnBlogs
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
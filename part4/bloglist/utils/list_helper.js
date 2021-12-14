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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './blog'

test('renders content', () => {
  const blog = {
    title: 'Some text',
    author: 'Some author',
    likes: 0,
    url: 'foo.bar.com'
  }

  const component = render(
    <Blog blog={blog} user={{}} handleRemoveBlog={() => {}} handleLikeBlog={() => {}} />
  )

  // component.debug()

  expect(component.container).toHaveTextContent(`${blog.title} by ${blog.author}`)

  expect(component.container.querySelector('.url')).toBeNull()

  expect(component.container.querySelector('.likes')).toBeNull()

})
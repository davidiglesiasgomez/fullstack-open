import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

  const user = {
    user: 'root',
    username: 'Superuser'
  }

  const blog = {
    title: 'Some text',
    author: 'Some author',
    likes: 0,
    url: 'foo.bar.com',
    user: user
  }

  test('renders content', () => {

    const component = render(
      <Blog blog={blog} user={user} handleRemoveBlog={() => {}} handleLikeBlog={() => {}} />
    )

    // component.debug()

    expect(component.container).toHaveTextContent(`${blog.title} by ${blog.author}`)

    expect(component.container.querySelector('.url')).toBeNull()

    expect(component.container.querySelector('.likes')).toBeNull()

  })

  test('clicking the button shows likes and url', () => {

    const component = render(
      <Blog blog={blog} user={user} handleRemoveBlog={() => {}} handleLikeBlog={() => {}} />
    )

    const button = component.getByText('show')
    fireEvent.click(button)

    // component.debug()

    expect(component.container).toHaveTextContent(`${blog.title} by ${blog.author}`)

    expect(component.container.querySelector('.url')).toHaveTextContent(blog.url)

    expect(component.container.querySelector('.likes')).toHaveTextContent(`likes: ${blog.likes}`)

  })

  test('clicking twice the like button', () => {

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} user={user} handleRemoveBlog={() => {}} handleLikeBlog={mockHandler} />
    )

    const showButton = component.getByText('show')
    fireEvent.click(showButton)

    // component.debug()

    const likeButton = component.getByText('like')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })

})
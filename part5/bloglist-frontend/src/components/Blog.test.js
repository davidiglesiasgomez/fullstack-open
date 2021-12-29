import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './blog'

describe('<Blog />', () => {

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

  test('clicking the button shows likes and url', () => {
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

})
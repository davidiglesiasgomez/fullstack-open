import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  test('Updates parent state and calls onSubmit', () => {
    const handleAddBlog = jest.fn()

    const component = render(
      <BlogForm handleAddBlog={handleAddBlog} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'Blog title' }
    })
    fireEvent.change(author, {
      target: { value: 'Blog author' }
    })
    fireEvent.change(url, {
      target: { value: 'Blog url' }
    })
    fireEvent.submit(form)

    expect(handleAddBlog.mock.calls).toHaveLength(1)
    expect(handleAddBlog.mock.calls[0][0].title).toBe('Blog title')
    expect(handleAddBlog.mock.calls[0][0].author).toBe('Blog author')
    expect(handleAddBlog.mock.calls[0][0].url).toBe('Blog url')
  })

})
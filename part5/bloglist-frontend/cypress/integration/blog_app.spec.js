/// <reference types="cypress" />

describe('Blog app', function() {

  beforeEach(function() {
    cy.resetDatabase()
    cy.createUser({
      name: 'Root',
      username: 'root',
      password: 'root'
    })
  })

  it('Front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
    cy.get('input[name="Username"]')
    cy.get('input[name="Password"]')
    cy.get('button[type="submit"]')
  })

  describe('Login',function() {
    it('Succeeds with correct credentials', function() {
      cy.visit('http://localhost:3000')
      cy.contains('login').click()
      cy.get('input[name="Username"]').type('root')
      cy.get('input[name="Password"]').type('root')
      cy.get('#loginButton').click()
      cy.contains('Root logged in')
    })

    it('Fails with wrong credentials', function() {
      cy.visit('http://localhost:3000')
      cy.contains('login').click()
      cy.get('input[name="Username"]').type('root')
      cy.get('input[name="Password"]').type('toor')
      cy.get('#loginButton').click()
      cy.get('div.error').contains('Wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'root' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('input#title').type('Blog title')
      cy.get('input#author').type('Blog author')
      cy.get('input#url').type('foo.bar.com')
      cy.get('#addBlogButton').click()
      cy.contains('Blogs')
      cy.contains('Blog title by Blog author')
    })
  })

  describe('Like button', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'root' })
      cy.createBlog({ title: 'Blog title', author: 'Blog author', url: 'foo.bar.com' })
    })

    it('A blog can be liked', function() {
      cy.get('button.toggleBlogButton').click()
      cy.get('span.likes').contains('likes: 0')
      cy.get('button.likeBlogButton').click()
      cy.get('span.likes').contains('likes: 1')
      cy.get('div.success').contains('the blog \'Blog title\' by \'Blog author\' was liked')
    })
  })

  describe('Delete button', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'root' })
      cy.createBlog({ title: 'Blog title', author: 'Blog author', url: 'foo.bar.com' })
    })

    it('A blog can be deleted by user', function() {
      cy.get('button.toggleBlogButton').click()
      cy.get('button.deleteBlogButton').click()
      cy.on('window:confirm', () => true)
      cy.get('div.success').contains('the blog \'Blog title\' by \'Blog author\' was deleted')
    })

    it('A blog can\'t be deleted by other user', function() {
      cy.createUser({
        name: 'Other user',
        username: 'other',
        password: 'other'
      })
      cy.login({ username: 'other', password: 'other' })
      cy.get('button.toggleBlogButton').click()
      cy.get('button.deleteBlogButton').should('not.exist')
    })
  })
})
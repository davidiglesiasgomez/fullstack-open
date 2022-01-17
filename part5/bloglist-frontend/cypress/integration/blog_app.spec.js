/// <reference types="cypress" />

describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Root',
      username: 'root',
      password: 'root'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  })

  // it('front page can be opened', function() {
  //   cy.visit('http://localhost:3000')
  //   cy.contains('Blogs')
  //   cy.contains('Canonical string reduction by Edsger W. Dijkstra')
  // })

  it('login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
    cy.get('input[name="Username"]')
    cy.get('input[name="Password"]')
    cy.get('button[type="submit"]')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.visit('http://localhost:3000')
      cy.contains('login').click()
      cy.get('input[name="Username"]').type('root')
      cy.get('input[name="Password"]').type('root')
      cy.get('#loginButton').click()
      cy.contains('Root logged in')
    })

    it('fails with wrong credentials', function() {
      cy.visit('http://localhost:3000')
      cy.contains('login').click()
      cy.get('input[name="Username"]').type('root')
      cy.get('input[name="Password"]').type('toor')
      cy.get('#loginButton').click()
      cy.get('div.error').contains('Wrong credentials')
    })
  })
})
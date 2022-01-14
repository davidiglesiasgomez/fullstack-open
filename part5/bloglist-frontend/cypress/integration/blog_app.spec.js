/// <reference types="cypress" />

describe('Blog app', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
    cy.contains('Canonical string reduction by Edsger W. Dijkstra')
  })

  it('login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
    cy.get('input[name="Username"]')
    cy.get('input[name="Password"]')
    cy.get('button[type="submit"]')
  })
})
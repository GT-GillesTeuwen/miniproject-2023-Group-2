
describe('tests landing page', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.on('uncaught:exception', (err, runnable) => { return false; })
  })

  it('should have routing buttons defined', () => {  
    cy.get('.button').contains('Login')
    cy.get('.button').contains('Register')
  })

  it('should navigate to login', () => {  
    cy.get('.button').contains('Login').click()
    cy.url().should('include', '/login')
  })

  it('should navigate to signup', () => {  
    cy.get('.button').contains('Login').click()
    cy.url().should('include', '/login')
  })

  it('should navigate to login', () => {  
    cy.get('.button').contains('Login').click()
    cy.url().should('include', '/login')
  })

  it('should attempt to login with only email', () => {  
    cy.get('.button').contains('Login').click()
    cy.url().should('include', '/login')

    cy.fixture('test.credentials.json')
    .then( userCredentials => {
      cy.get('input').first().type(userCredentials[0].email)
      cy.get('.button').should('be.disabled')
    })

  })

  it('should attempt to login with incorrect credentials', () => {  
    cy.get('.button').contains('Login').click()
    cy.url().should('include', '/login')

    cy.fixture('test.credentials.json')
    .then( userCredentials => {
      cy.get("#emailInput").type(userCredentials[0].email)
      cy.get("#passwordInput").type(userCredentials[0].password)
      cy.get('#loginButton').click()
      cy.url().should('include', '/login')
    })

  })

})
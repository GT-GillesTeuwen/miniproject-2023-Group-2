describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
    cy.on('uncaught:exception', (err, runnable) => { return false; })
  })
})
Cypress.Commands.add('clickNewGatewayServiceBtn', () => {
    cy.get('[data-testid="toolbar-add-gateway-service"]')
        .should('be.visible')
        .click();
    cy.url().should('include', '/default/services/create');
  })

  Cypress.Commands.add('fillFullUrl', (fullUrl) => {
    cy.get('[data-testid="gateway-service-url-input"]').type(fullUrl)
  })
  
 Cypress.Commands.add('clickSaveBtn', () => {
     cy.get('[data-testid="service-create-form-submit"]').click()
     cy.url().should('match', /\/services\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  })
  
Cypress.Commands.add('checkFullUrl', () => {
    cy.get('[data-testid="gateway-service-url-radio"]').should('be.checked')    
  })

Cypress.Commands.add('createServicesByFullUrl', (fullUrl) => {
     cy.clickNewGatewayServiceBtn()
     cy.checkFullUrl()
     cy.fillFullUrl(fullUrl)
     cy.clickSaveBtn()
})
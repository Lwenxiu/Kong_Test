import menus  from '../../fixtures/menu.json' 

Cypress.Commands.add('goto', (menuName) => {
  cy.visit(menuName )
})

Cypress.Commands.add('gotoGatewayServices', () => {
  cy.goto(menus.gatewayServices)
})


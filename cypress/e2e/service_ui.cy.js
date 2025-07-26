describe("Kong Manage test for service UI automation",() => {

    it("create a service by testid",() => {
        let serviceId
        cy.gotoGatewayServices()

        cy.createServicesByFullUrl("http://localhost:8002/test01")

        //get service id
        cy.url().then((url) => {
            cy.log('我的log',url)
            serviceId = url.split('/services/')[1]
            cy.log('我的serviceid',serviceId)
            cy.wrap(serviceId).as('serviceId')
        })

        cy.get('@serviceId').then((serviceId) =>{
            cy.get('.add-route-btn').click()
        cy.url().should('include',"routes/create").should('include',serviceId)
        })    
    })

})
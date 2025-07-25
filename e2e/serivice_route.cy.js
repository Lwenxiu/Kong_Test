import dayjs from "dayjs"
describe("Kong workspace test", () => {

    const currentTime = dayjs().format('HHmmss')

    it("create service", () => {

        cy.request({
            method: 'POST',
            url: "services/",
            form:true,
            body: {
                name: 'test_service'+currentTime,
                url: 'http://localhost:8001',
            },
            failOnStatusCode: true,
            retryOnNetworkFailure: true

        }).then((resp) => {
            expect(resp.status).to.eq(201)
            const serviceName = resp.body.name
            expect(serviceName).to.not.be.oneOf(['', null, undefined])
            const serviceId = resp.body.id
            expect(serviceId).to.not.be.oneOf(['', null, undefined])
            Cypress.env('serviceId', serviceId)
            Cypress.env('serviceName', serviceName)
        })
    })


    it("create route via service", () => {
        cy.request({
            method: 'POST',
            url: "routes/",
            body: {
                "name": "test-route"+currentTime,
                "paths": [
                    "/" + Cypress.env('serviceName')
                ],
                "strip_path": true,
                "service": {
                    "id": Cypress.env('serviceId')
                }
            },
            failOnStatusCode: true,
            retryOnNetworkFailure: true

        }).then((resp) => {
            expect(resp.status).to.eq(201)
            const routeName = resp.body.name
            expect(routeName).to.not.be.oneOf(['', null, undefined])
            const routeId = resp.body.id
            expect(routeId).to.not.be.oneOf(['', null, undefined])
        })
    })

})


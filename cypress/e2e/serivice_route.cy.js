import dayjs from "dayjs"
describe("Kong workspace test for service API", () => {

    const currentTime = dayjs().format('HHmmss')
    const env = Cypress.env('env') || 'api';
    const baseUrl = Cypress.env(env).baseUrl;

    it("create service", () => {
        let serviceName = 'test_service'+currentTime
        cy.request({
            method: 'POST',
            url: baseUrl+"services/",
            form:true,
            body: {
                name: serviceName,
                url: 'http://localhost:8001',
            },
            failOnStatusCode: true,
            retryOnNetworkFailure: true

        }).then((resp) => {
            expect(resp.status).to.eq(201)
            const serviceName = resp.body.name
            expect(serviceName).to.not.be.oneOf(['', null, undefined])
            expect(serviceName).to.equal(serviceName)
            const serviceId = resp.body.id
            expect(serviceId).to.not.be.oneOf(['', null, undefined])
            Cypress.env('serviceId', serviceId)
            Cypress.env('serviceName', serviceName)
        })
    })


    it("create route via service", () => {
        let routeName = "test-route"+currentTime
        cy.request({
            method: 'POST',
            url: baseUrl+"routes/",
            body: {
                "name": routeName,
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
            expect(routeName).to.equal(routeName)
            const routeId = resp.body.id
            expect(routeId).to.not.be.oneOf(['', null, undefined])
        })
    })

})


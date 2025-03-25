const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor")

var counter = 1;

const user = {
    name: "Usuário teste " + counter,
    email: "usuarioteste" + counter + "@email.com",
    password: "Senha@123",
    isAdmin: false
}

Given("o usuário tem conta no sistema", () => {
    counter++;
    cy.api_createNewUser(user)
        .then((response) => {
            expect(response.status).to.eq(201)
            Cypress.log({ message: response.body })
        })
})

When("a requisição de reset é enviada por um admin", () => {
    // # RESET
    cy.api_resetDatabaseUsers()
        .then(response => {
            Cypress.log({
                message: response.body
            })
            expect(response.status).to.eq(200)
        })
})

Then("o banco de dados é retorna para o estado inicial", () => {
    cy.api_getAllUsers()
        .then(response => {
            expect(response.status).to.eq(200)
            expect(response.body).to.length(1)

            Cypress.log({ message: "O Database só tem o usuário admin" })
        })
})


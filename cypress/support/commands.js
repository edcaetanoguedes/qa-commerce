// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import BasePage from "../e2e/page-object/BasePage"
const HEADERS = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${Cypress.env("SECRET_KEY")}`
}

Cypress.Commands.add("login", (username, password) => {
    const basePage = new BasePage()
    basePage.toMyAccount();
    basePage.login(username, password)
})

Cypress.Commands.add("logout", () => {
    const basePage = new BasePage()
    basePage.logoutBtn().click()
})

Cypress.Commands.add("api_getProductById", (id) => {
    return cy.request({
        method: "GET",
        url: `/api/produtos/${id}`,
        headers: { ...HEADERS },
        failOnStatusCode: false
    })
})

Cypress.Commands.add("api_createNewUser", (info) => {
    return cy.request({
        method: "POST",
        url: `/api/users`,
        headers: { ...HEADERS },
        body: {
            "name": `${info.firstname} ${info.lastname}`,
            "email": info.email,
            "password": info.password,
            "isAdmin": false
        },
        failOnStatusCode: false
    })
})


Cypress.Commands.add("api_getAllUsers", () => {
    return cy.request({
        method: "GET",
        url: `/api/users`,
        headers: { ...HEADERS },
        failOnStatusCode: false
    })
})
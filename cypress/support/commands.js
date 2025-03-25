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
const CREDENTIALS_ADMIN = { email: "admin@admin.com", password: "admin" }

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

// TESTADO
Cypress.Commands.add("api_login", (credentials) => {
    return cy.request({
        method: "POST",
        url: "/api/login",
        headers: { ...HEADERS },
        body: {
            email: credentials.email, password: credentials.password
        }
    })
})

// TESTADO
Cypress.Commands.add("api_createNewUser", (info) => {
    return cy.request({
        method: "POST",
        url: `/api/users`,
        headers: { ...HEADERS },
        body: {
            "name": info.name,
            "email": info.email,
            "password": info.password,
            "isAdmin": false
        },
        failOnStatusCode: false
    })
})

// TESTADO
Cypress.Commands.add("api_getAllUsers", () => {
    return cy.request({
        method: "GET",
        url: `/api/users`,
        headers: { ...HEADERS },
        failOnStatusCode: false
    })
})

// TESTADO
Cypress.Commands.add("api_getUserById", () => {
    return cy.request({
        method: "GET",
        url: `/api/users`,
        headers: { ...HEADERS },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(200)
        try {
            return response.body.map(user => user.id == user_id)[0]
        } catch (err) {
            return null
        }
    })
})

// TESTADO
Cypress.Commands.add("api_getAllProducts", () => {
    return cy.request({
        method: "GET",
        url: "/api/produtos",
        headers: { ...HEADERS },
        failOnStatusCode: false
    })
})

Cypress.Commands.add("api_getProductById", (id) => {
    return cy.request({
        method: "GET",
        url: `/api/produtos/${id}`,
        headers: { ...HEADERS },
        failOnStatusCode: false
    })
})

Cypress.Commands.add("api_addProductToCart", (payload) => {
    return cy.request({
        method: "POST",
        url: "/api/carrinho",
        headers: { ...HEADERS },
        body: {
            userId: payload.userId,
            productId: payload.productId,
            quantity: payload.quantity
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add("api_getCartByUser", (id) => {
    return cy.request({
        method: "GET",
        url: `/api/carrinho/${id}`,
        headers: { ...HEADERS },
        failOnStatusCode: false
    })
})

// TESTADO
Cypress.Commands.add("api_resetDatabaseUsers", () => {
    cy.api_login(CREDENTIALS_ADMIN)
    .then(response => {
        expect(response.status).to.eq(200)

        const token = new String(response.body.token).split(" ")[1]
        cy.request({
            method: "DELETE",
            url: `/api/users`,
            headers: { ...HEADERS, "Authorization": `Bearer ${token}` },
            failOnStatusCode: false
        })
    })
})
const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const { expect } = require("chai");

const client5 = "clients/client5.json";

let status_code, body, user_id, token;

Given("que a API está funcionando corretamente", () => {
    //
})

When("envio uma requisição para criar um usuário", () => {
    // Utiliza um modelo json para criar o usuário
    cy.fixture(client5)
        .then((info) => {
            // POST: Requisição de criação de usuário
            cy.api_createNewUser(info)
                .then((response) => {
                    Cypress.log({ message: response.body.message })
                    // Valida o status de acordo a API
                    expect(response.status).to.eq(201)
                    // Atribui os valores obtidos para acesso externo
                    status_code = response.status;
                    user_id = response.body.id;
                })
        })
})

Then("a API deve retornar status 201", () => {
    // Verifica se o código do response foi realmente atribuído 
    cy.wrap(status_code).should("exist");
    cy.log("status code: ", status_code)
})

Then("o corpo da resposta deve conter o id do usuário criado", () => {
    // Verifica se o ID do usuário foi realmente atribuído 
    cy.wrap(user_id).should("exist");
    cy.log("user_id: ", user_id)
})

Then("o usuário deve existir na API quando consultado", () => {
    // GET: Requisição para listar os usuários cadastrados
    expect(cy.api_getUserById(user_id)).to.not.null
    user_id = null;

    // # RESET
    cy.api_resetDatabaseUsers()
        .then((response) => {
            expect(response.status).to.eq(200)
            Cypress.log({ message: response.message })
        })
})

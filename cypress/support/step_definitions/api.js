const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

const client5 = "clients/client5.json";

let user_id, status_code;

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
    // Valida o status de acordo a API
    expect(status_code).to.eq(201)
})

Then("o corpo da resposta deve conter o id do usuário criado", () => {
    // Verifica se o ID do usuário foi realmente atribuído 
    cy.wrap(user_id).should("exist");
    cy.log("user_id: ", user_id)
})

Then("o usuário deve existir na API quando consultado", () => {
    // GET: Requisição para listar os usuários cadastrados
    cy.api_getAllUsers()
        .then((response) => {
            expect(response.status).to.eq(200)
            // Verifica se o novo usuário está entre os usuários cadastrados
            const _filtered = response.body.filter(user => user.id == user_id)
            expect(_filtered).to.have.length(1)
        })
})
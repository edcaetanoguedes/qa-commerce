import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CartPage from "../../e2e/page-object/CartPage";
import ProductPage from "../../e2e/page-object/ProductPage";
import CheckoutPage from "../../e2e/page-object/CheckoutPage";
import BasePage from "../../e2e/page-object/BasePage";

const productPage = new ProductPage()
const cartPage = new CartPage()
const checkoutPage = new CheckoutPage()
const product_id = 1;
var index_client = 0;
const client1 = "clients/client1.json";
const client2 = "clients/client2.json";

Given("o usuário tem um produto no carrinho", () => {
    // Segue para Carrinho
    productPage.toCart()
})

Then("acessa a página de checkout", () => {
    // Botão 'Ir para o Checkout'
    cartPage.goToCheckoutBtn().click()
})

When("preenche todos os campos obrigatórios", () => {
    // Preenche todos os campos obrigatórios
    cy.fixture(client1)
        .then(info => {
            checkoutPage.typeInfoUser(info)
            index_client++;
        })
})

Then("seleciona a opção para criar uma conta", () => {
    checkoutPage.newAccountCheck().click()
})

Then("preenche os campos destinados à senha", () => {
    cy.fixture(client1)
        .then(info => {
            checkoutPage.passwordInput().type(info.password)
            checkoutPage.repeatPasswordInput().type(info.password)
        })
})

Then("escolhe um método de pagamento", () => {
    // Boleto
    checkoutPage.paymentBoletoCheck().click()
})

Then("aceita os termos e condições", () => {
    checkoutPage.acceptTermsCheck().click()
})

Then("confirma a compra", () => {
    // Botão 'Finalizar pedido'
    checkoutPage.finishOrderBtn().click()
})

Then("uma mensagem de sucesso deve ser exibida", () => {
    // Verifica se a mensagem de pedio finalizado é exibida
    checkoutPage.checkValidationOrder()

    cy.api_resetDatabaseUsers()
        .then(response => {
            expect(response.status).to.eq(200)
            Cypress.log({ message: response.body })
        })
})
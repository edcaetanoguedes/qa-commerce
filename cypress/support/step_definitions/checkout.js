import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CartPage from "../../e2e/page-object/CartPage";
import ProductPage from "../../e2e/page-object/ProductPage";
import CheckoutPage from "../../e2e/page-object/CheckoutPage";
import BasePage from "../../e2e/page-object/BasePage";

const productPage = new ProductPage()
const cartPage = new CartPage()
const checkoutPage = new CheckoutPage()
const client1 = "clients/client1.json";
var product = {};

// Scenario: Usuário adiciona um produto ao carrinho com sucesso

Given ("O usuário acessa a página de um produto", () => {
    cy.visit("/")

    // Vai até a página do 1º produto
    cy.get(".card>a").first().click()
})

When ('clica no botão "Adicionar ao Carrinho"', () => {
    // Obtém informações do produto via UI
    // Obtém o ID do produto
    productPage.addProductToCartBtn().invoke("attr", "data-id")
    .then(attribute => {
        Cypress.log({ message: "product ID: " + attribute.valueOf()})
        
        // Atribui o id à uma variável externa
        product.id = attribute.valueOf();
        cy.wrap(product.id).should("exist")
    })

    // Obtém nome do produto
    productPage.titleProductLabel()
    .then(attribute => {
        product.name = attribute.text()
        cy.wrap(product.name).should("exist")
    })

    // Obtém preço do produto
    productPage.priceProductLabel()
    .then(attribute => {
        // Obtém somente o valor numérico em meio ao texto
        product.price = new String(attribute.text()).replace(/[a-zA-ZçÇ$: ]/g, "")
        cy.wrap(product.price).should("exist")
    })

    // Obtém quantidade do produto
    productPage.quantityInput().invoke("attr", "value")
    .then(attribute => {
        product.quantity = new String(attribute.valueOf()).replace(/[a-zA-ZçÇ$: ]/g, "")
        cy.wrap(product.quantity).should("exist")
    })

    // Obtém descrição do produto
    productPage.descriptionProductLabel()
    .then(attribute => {
        product.description = attribute.text()
        cy.wrap(product.description).should("exist")
    })
    
    productPage.addProductToCartBtn().click()
})

Then ("O produto deve constar no carrinho", () => {  
    productPage.goToCart()

    // Obtém informações do produto via API
    cy.api_getProductById(product.id)
    .then(response => {
        expect(response.status).to.eq(200)

        // Compara as informações da interface com as da API
        // Compara o Id do produto
        expect(Number.parseInt(response.body.id)).to.eq(Number.parseInt(product.id))

        // Compara o título do produto
        expect(response.body.name).to.eq(product.name)

        // Compara o preço
        expect(Number(response.body.price).toFixed(2)).to.eq(product.price)

        // Compara a quantidade definida da página do produto com a quantidade do carrinho
        cartPage.quantityLabel(product.id)
        .then(attribute => {
            let quantity_in_cart = new String(attribute.text()).replace(/[a-zA-ZçÇ$: ]/g, "")
            expect(quantity_in_cart).to.eq(product.quantity)
        })
    })
})

//  Scenario: Usuário conclui o checkout completo com sucesso
    
Given("o usuário tem um produto no carrinho", () => {
    productPage.goToCart()
})

Then("acessa a página de checkout", () => {
    cartPage.goToCheckoutBtn().click()
})

When("preenche todos os campos obrigatórios", () => {
    // Preenche todos os campos obrigatórios
    cy.fixture(client1)
        .then(info => {
            checkoutPage.typeInfoUser(info)
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
    checkoutPage.paymentBoletoCheck().check()
})

Then("aceita os termos e condições", () => {
    checkoutPage.acceptTermsCheck().check()
})

Then("confirma a compra", () => {
    // Botão 'Finalizar pedido'
    checkoutPage.finishOrderBtn().click()
})

Then("uma mensagem de sucesso deve ser exibida", () => {
    // Verifica se a mensagem de pedio finalizado é exibida
    checkoutPage.checkValidationOrder()
})
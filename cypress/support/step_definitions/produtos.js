import { When, Given, Then, Before } from "@badeball/cypress-cucumber-preprocessor";
import ProductPage from "../../e2e/page-object/ProductPage";
import CartPage from "../../e2e/page-object/CartPage";

const productPage = new ProductPage()
const cartPage = new CartPage()

const product_id = 1;
const product_qtd = 2;

Given("O usuário acessa a página do produto", () => {
    productPage.open(product_id)
})

When('O usuário clica no botão "Adicionar ao Carrinho"', () => {
    // Adiciona o produto no carrinho
    productPage.addProductToCart(product_id, product_qtd)
    // Segue para o Carrinho
    productPage.toCart()
})

Then("O produto deve ser exibido corretamente no carrinho", () => {
    // Obtém as informações do produto via API
    cy.api_getProductById(product_id)
    .then(response => {

        // Compara o preço exibido com o preço do produto na API
        cartPage.priceLabel(product_id).contains(response.body.price)
        // Compara a quantidade exibida com o valor definido para teste
        cartPage.quantityLabel(product_id).contains(product_qtd)
        // Compara o total exibido com o total calculado através dos valores pré-definidos
        cartPage.totalLabel(product_id).contains(response.body.price * product_qtd)
    })
})
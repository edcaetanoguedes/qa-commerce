import BasePage from "./BasePage";


export default class ProductPage extends BasePage {
    // Abre a página de um produto via ID
    open(product_id) {
        cy.visit(`/product.html?id=${product_id}`)
    }
    
    quantityInput() {
        return cy.get(`input[id=product-quantity]`)
    }

    addProductToCartBtn(id) {
        return cy.get(`button#add-to-cart[data-id=${id}]`)
    }
}
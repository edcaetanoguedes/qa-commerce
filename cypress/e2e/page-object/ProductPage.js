import BasePage from "./BasePage";


export default class ProductPage extends BasePage {
    titleProductLabel() {
        return cy.get("#product-details").get("legend")
    }

    descriptionProductLabel() {
        return cy.get("#product-description")
    }

    priceProductLabel() {
        return cy.get("#product-price")
    }
    
    quantityInput() {
        return cy.get(`input#product-quantity`)
    }

    addProductToCartBtn() {
        return cy.get("button").contains("Adicionar ao carrinho")
    }
}
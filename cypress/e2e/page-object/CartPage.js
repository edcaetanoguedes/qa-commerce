import BasePage from "./BasePage";


export default class CartPage extends BasePage {
    parent = "div.cart-item";
    
    priceLabel(id) {
        return this.removeItemBtn(id).parent(this.parent).get("p").contains("Preço")
    }

    quantityLabel(id) {
        return this.removeItemBtn(id).parent(this.parent).get("p").contains("Quantidade")
    }

    totalLabel(id) {
        return this.removeItemBtn(id).parent(this.parent).get("p").contains("Total")
    }

    subTotalLabel(id) {
        return this.removeItemBtn(id).parent(this.parent).get("#total-products")
    }

    freteLabel(id) {
        return this.removeItemBtn(id).parent(this.parent).get("#shipping-fee")
    }

    valorTotalLabel(id) {
        return this.removeItemBtn(id).parent(this.parent).get("#total-with-shipping")
    }

    // Remove o item do carrinho
    removeItemBtn(id) {
        // UM BOTÃO REMOVER PARA CADA ITEM DO CARRINHO
        return cy.get(`button.remove-from-cart[data-product-id=${id}]`)
    }

    // Seguir para a página de Checkout
    goToCheckoutBtn() {
        return cy.get("a").contains("Ir para o Checkout")
    }
}
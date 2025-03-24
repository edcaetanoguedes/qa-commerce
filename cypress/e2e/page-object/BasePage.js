
export default class BasePage {
    // Abre a página inicial do site
    open() {
        cy.visit("/");
    }

    // Seguir para a página do carrinho
    toCart() {
        cy.visit("/cart.html")
    }

    // Ir para Minha Conta
    toMyAccount() {
        cy.visit("/dashboard.html")
    }

    // Ir para Minha Conta
    toLogin() {
        cy.visit("/login.html")
    }

    // 
    navibarContainer() {
        return cy.get(".navbar-nav")
    }

    //
    nameInput() {
        return cy.get("input#name")
    }

    emailInput() {
        return cy.get("input#email")
    }

    passwordInput() {
        return cy.get("input#password")
    }

    loginBtn() {
        return cy.get("#login-form").get("button[type='submit'")
    }

    logoutBtn() {
        return cy.get("button#logout-button")
    }

    editAccountBtn() {
        return cy.get("button#update-account-button")
    }

    updateAccountBtn() {
        return cy.get("button[type='submit']").contains("Atualizar")
    }

    // login
    login(username, password) {
        this.emailInput().type(username)
        this.passwordInput().type(password)
        this.loginBtn().click()
        cy.url().should("include", "/dashboard")
    }

    quantityInput(id) {
        return cy.get(`input[id=quantity-${id}]`)
    }

    addProductToCartBtn(id) {
        return cy.get(`button.add-to-cart[data-id=${id}]`)
    }

    addProductToCart(id, qtd) {
        // Alterar a quantidade do produto
        this.quantityInput(id).clear().type(qtd || 1)

        // Adicionar produto ao carrinho
        this.addProductToCartBtn(id).click()
    }
}
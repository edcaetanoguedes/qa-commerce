

export default class User {
    typeCheckout() {
        cy.get("#first-name").type("Eddye")
        cy.get("#last-name").type("Guedes")
        cy.get("#address").type("Estrada do MG")
        cy.get("#number").type("2033")
        cy.get("#cep").type("06719500")
        cy.get("#phone").type("5511998884444")
        cy.get("#email").type("eddyeguedes6@email.com")
    }   

    typePassword(password) {
        cy.get("#password").type("Pass25!" || password)
        cy.get("#confirm-password").type("Pass25!" || password)
    }

    typePaymentCardForm() {
        cy.get("input#card-number")
        cy.get("input#card-expiry")
        cy.get("input#card-cvc")
    }
}
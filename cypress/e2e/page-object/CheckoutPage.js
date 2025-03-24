import BasePage from "./BasePage"


export default class CheckoutPage extends BasePage {
    formCheckout() {
        return cy.get("#checkout-form")
    }
    
    firstnameInput() {
        return this.formCheckout().get("#first-name")
    }

    lastnameInput() {
        return this.formCheckout().get("#last-name")
    }

    addressInput() {
        return this.formCheckout().get("#address")
    }

    numberInput() {
        return this.formCheckout().get("#number")
    }

    cepInput() {
        return this.formCheckout().get("#cep")
    }

    phoneInput() {
        return this.formCheckout().get("#phone")
    }

    emailInput() {
        return this.formCheckout().get("#email")
    }

    newAccountCheck() {
        return this.formCheckout().get("#create-account")
    }

    passwordInput() {
        return this.formCheckout().get("#password")
    }

    repeatPasswordInput() {
        return this.formCheckout().get("#confirm-password")
    }

    paymentCardCheck() {
        return this.formCheckout().get("input#payment-card")
    }

    paymentBoletoCheck() {
        return this.formCheckout().get("input#payment-boleto")
    }

    paymentPixCheck() {
        return this.formCheckout().get("input#payment-pix")
    }

    cardNumberInput() {
        return this.formCheckout().get("input#card-number")
    }

    cardExpiryInput() {
        return this.formCheckout().get("input#card-expiry")
    }

    cardCvcInput() {
        return this.formCheckout().get("input#card-cvc")
    }

    acceptTermsCheck() {
        return this.formCheckout().get("#terms")
    }

    finishOrderBtn() {
        return this.formCheckout().get("button[type=submit]")
    }

    checkValidationOrder() {
        cy.get("div#order-status").get("h4").contains("Obrigado pelo seu pedido")
        cy.get("p").contains("ID do Pedido")
        cy.get("p").contains("Total")
        cy.get("p").contains("Status")
    }

    typeInfoUser(info) {
        this.firstnameInput().type(info.firstname)
        this.lastnameInput().type(info.lastname)
        this.addressInput().type(info.address)
        this.numberInput().type(info.number)
        this.cepInput().type(info.cep)
        this.phoneInput().type(info.phone)
        this.emailInput().type(info.email)
    }
}
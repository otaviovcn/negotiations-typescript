import { Negotiation } from "../models/negociation.js";
export class NegociacaoController {
    constructor() {
        this.dateInput = document.querySelector('#data');
        this.quantityInput = document.querySelector('#quantidade');
        this.valueInput = document.querySelector('#valor');
    }
    adds() {
        this.dateInput.focus;
    }
    createsNegotiation() {
        const exp = /-/g;
        const date = new Date(this.dateInput.value.replace(exp, ','));
        const quantity = parseInt(this.quantityInput.value);
        const value = parseFloat(this.valueInput.value);
        return new Negotiation(date, quantity, value);
    }
}

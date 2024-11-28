import { Negotiation } from "../models/negotiation.js";
export class NegociacaoController {
    constructor() {
        this.dateInput = document.querySelector('#data');
        this.quantityInput = document.querySelector('#quantidade');
        this.valueInput = document.querySelector('#valor');
    }
    adds() {
        this.createsNegotiation();
    }
    createsNegotiation() {
        const exp = /-/g;
        const date = new Date(this.dateInput.value.replace(exp, ','));
        const quantity = parseInt(this.quantityInput.value);
        const value = parseFloat(this.valueInput.value);
        return new Negotiation(date, quantity, value);
    }
    clearEntries() {
        this.dateInput.value = '';
        this.quantityInput.value = '';
        this.valueInput.value = '';
        // Moves focus to the date field
        this.dateInput.focus;
    }
}

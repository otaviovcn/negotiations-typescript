export class Negotiation {
    constructor(_date, quantity, value) {
        this._date = _date;
        this.quantity = quantity;
        this.value = value;
    }
    get volume() {
        return this.quantity * this.value;
    }
    get date() {
        return new Date(this._date.getTime());
    }
    static createsNegotiation(dateInput, quantityInput, valueInput) {
        const exp = /-/g;
        const date = new Date(dateInput.replace(exp, ','));
        const quantity = parseInt(quantityInput);
        const value = parseFloat(valueInput);
        return new Negotiation(date, quantity, value);
    }
}

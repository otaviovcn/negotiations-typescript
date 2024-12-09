import { WeekDays } from "../enums/week-days.js";
import { Negotiation } from "../models/negotiation.js";
import { Negotiations } from "../models/negotiations.js";
import { MessageView } from "../views/message-view.js";
import { NegotiationsView } from "../views/negotiations-view.js";
/* Na arquitetura MVC, a camada Controller é responsvel por intermediar
  o acesso entre a View e a Model */
export class NegociacaoController {
    constructor() {
        this.negotiations = new Negotiations();
        this.negotiationsView = new NegotiationsView("#negotiationsView");
        this.messageView = new MessageView("#messageView");
        this.SUNDAY = 0;
        this.SATURDAY = 6;
        this.dateInput = document.querySelector('#data');
        this.quantityInput = document.querySelector('#quantidade');
        this.valueInput = document.querySelector('#valor');
        this.negotiationsView.update(this.negotiations);
    }
    adds() {
        const negotiation = this.createsNegotiation();
        if (this.isBusinessDay(negotiation.date)) {
            this.negotiations.adds(negotiation);
            this.updateView();
            this.clearEntries();
        }
        else {
            this.messageView.update('Apenas negociações em dias úteis são aceitas.');
        }
    }
    isBusinessDay(date) {
        return date.getDay() > WeekDays.SUNDAY && date.getDay() < WeekDays.SATURDAY;
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
        this.dateInput.focus();
    }
    updateView() {
        this.negotiationsView.update(this.negotiations);
        this.messageView.update(`${this.negotiations.list().length}ª Negociação adicionada`);
    }
}

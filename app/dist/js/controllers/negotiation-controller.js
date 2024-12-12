import { WeekDays } from "../enums/week-days.js";
import { Negotiation } from "../models/negotiation.js";
import { Negotiations } from "../models/negotiations.js";
import { MessageView } from "../views/message-view.js";
import { NegotiationsView } from "../views/negotiations-view.js";
export class NegociacaoController {
    constructor() {
        this.negotiations = new Negotiations();
        this.negotiationsView = new NegotiationsView("#negotiationsView", true);
        this.messageView = new MessageView("#messageView");
        this.dateInput = document.querySelector('#data');
        this.quantityInput = document.querySelector('#quantidade');
        this.valueInput = document.querySelector('#valor');
        this.negotiationsView.update(this.negotiations);
    }
    adds() {
        const negotiation = Negotiation.createsNegotiation(this.dateInput.value, this.quantityInput.value, this.valueInput.value);
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
    clearEntries() {
        this.dateInput.value = '';
        this.quantityInput.value = '';
        this.valueInput.value = '';
        this.dateInput.focus();
    }
    updateView() {
        this.negotiationsView.update(this.negotiations);
        this.messageView.update(`${this.negotiations.list().length}ª Negociação adicionada`);
    }
}

import { WeekDays } from "../enums/week-days.js";
import { Negotiation } from "../models/negotiation.js";
import { Negotiations } from "../models/negotiations.js";
import { MessageView } from "../views/message-view.js";
import { NegotiationsView } from "../views/negotiations-view.js";

/* Na arquitetura MVC, a camada Controller é responsvel por intermediar
  o acesso entre a View e a Model */
export class NegociacaoController {
  private dateInput: HTMLInputElement;
  private quantityInput: HTMLInputElement;
  private valueInput: HTMLInputElement;
  private negotiations: Negotiations = new Negotiations();
  private negotiationsView: NegotiationsView = new NegotiationsView("#negotiationsView", true);
  private messageView: MessageView = new MessageView("#messageView");

  constructor() {
    this.dateInput = document.querySelector('#data');
    this.quantityInput = document.querySelector('#quantidade');
    this.valueInput = document.querySelector('#valor');
    this.negotiationsView.update(this.negotiations);
  }

  public adds(): void {
    const negotiation = Negotiation.createsNegotiation(
      this.dateInput.value,
      this.quantityInput.value,
      this.valueInput.value
    );

    if (this.isBusinessDay(negotiation.date)) {
      this.negotiations.adds(negotiation);
      this.updateView();
      this.clearEntries();
    } else {
      this.messageView.update('Apenas negociações em dias úteis são aceitas.');
    }
  }

  private isBusinessDay(date: Date):boolean {
    return date.getDay() > WeekDays.SUNDAY && date.getDay() < WeekDays.SATURDAY
  }

  private clearEntries(): void {
    this.dateInput.value = '';
    this.quantityInput.value = '';
    this.valueInput.value = '';
    // Moves focus to the date field
    this.dateInput.focus();
  }

  private updateView(): void {
    this.negotiationsView.update(this.negotiations);
    this.messageView.update(`${this.negotiations.list().length}ª Negociação adicionada`);
  }

}
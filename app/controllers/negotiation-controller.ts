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
  private negotiationsView: NegotiationsView = new NegotiationsView("#negotiationsView");
  private messageView: MessageView = new MessageView("#messageView");

  constructor() {
    this.dateInput = document.querySelector('#data');
    this.quantityInput = document.querySelector('#quantidade');
    this.valueInput = document.querySelector('#valor');
    this.negotiationsView.update(this.negotiations);
  }
  
  adds(): void {
    const negotiation = this.createsNegotiation();
    this.negotiations.adds(negotiation);
    // this.negotiationsView.template();
    this.negotiationsView.update(this.negotiations);
    this.messageView.update("Mensagem aqui");
    this.clearEntries();
  }
  
  createsNegotiation(): Negotiation {
    const exp = /-/g;
    const date = new Date(this.dateInput.value.replace(exp, ','));
    const quantity = parseInt(this.quantityInput.value);
    const value = parseFloat(this.valueInput.value);
    return new Negotiation(date, quantity, value);
  }
  
  clearEntries(): void {
    this.dateInput.value = '';
    this.quantityInput.value = '';
    this.valueInput.value = '';
    // Moves focus to the date field
    this.dateInput.focus();
  }

}
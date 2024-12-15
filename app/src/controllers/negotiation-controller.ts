import { domInjector } from "../decorators/dom-injector.js";
import { inspect } from "../decorators/inspect.js";
import { logRuntime } from "../decorators/log-runtime.js";
import { WeekDays } from "../enums/week-days.js";
import { DayNegotiations } from "../interfaces/day-negotiations.js";
import { NegotiationsService } from "../services/nogotiation-service.js";
import { Negotiation } from "../models/negotiation.js";
import { Negotiations } from "../models/negotiations.js";
import { MessageView } from "../views/message-view.js";
import { NegotiationsView } from "../views/negotiations-view.js";

/* Na arquitetura MVC, a camada Controller é responsvel por intermediar
  o acesso entre a View e a Model */
export class NegociacaoController {
  @domInjector('#data')
  private dateInput: HTMLInputElement;
  @domInjector('#quantidade')
  private quantityInput: HTMLInputElement;
  @domInjector('#valor')
  private valueInput: HTMLInputElement;

  private negotiations: Negotiations = new Negotiations();
  private negotiationsView: NegotiationsView = new NegotiationsView("#negotiationsView");
  private messageView: MessageView = new MessageView("#messageView");
  private negotiationsService: NegotiationsService = new NegotiationsService();

  constructor() {
    this.negotiationsView.update(this.negotiations);
  }

  @inspect()
  @logRuntime("seconds")
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

  public dataImport(): void {
    this.negotiationsService.getDayNegotiations()
      .then(negotiations => {
        for(let negotiation of negotiations) {
          this.negotiations.adds(negotiation);
        }
        this.negotiationsView.update(this.negotiations);
      })
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
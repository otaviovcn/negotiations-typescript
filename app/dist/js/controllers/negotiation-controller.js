var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { domInjector } from "../decorators/dom-injector.js";
import { inspect } from "../decorators/inspect.js";
import { logRuntime } from "../decorators/log-runtime.js";
import { WeekDays } from "../enums/week-days.js";
import { NegotiationsService } from "../services/negotiation-service.js";
import { Negotiation } from "../models/negotiation.js";
import { Negotiations } from "../models/negotiations.js";
import { MessageView } from "../views/message-view.js";
import { NegotiationsView } from "../views/negotiations-view.js";
export class NegociacaoController {
    constructor() {
        this.negotiations = new Negotiations();
        this.negotiationsView = new NegotiationsView("#negotiationsView");
        this.messageView = new MessageView("#messageView");
        this.negotiationsService = new NegotiationsService();
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
    dataImport() {
        this.negotiationsService.getDayNegotiations()
            .then((negotiations) => {
            const list = this.negotiations.list();
            return negotiations.filter(negotiation => {
                return !this.negotiations.list()
                    .some(negotiationOfList => negotiationOfList.itIsSame(negotiation));
            });
        })
            .then(negotiations => {
            for (let negotiation of negotiations) {
                this.negotiations.adds(negotiation);
            }
            this.negotiationsView.update(this.negotiations);
        });
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
__decorate([
    domInjector('#data')
], NegociacaoController.prototype, "dateInput", void 0);
__decorate([
    domInjector('#quantidade')
], NegociacaoController.prototype, "quantityInput", void 0);
__decorate([
    domInjector('#valor')
], NegociacaoController.prototype, "valueInput", void 0);
__decorate([
    inspect(),
    logRuntime("seconds")
], NegociacaoController.prototype, "adds", null);

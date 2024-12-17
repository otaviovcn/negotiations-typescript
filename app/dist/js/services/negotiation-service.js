import { Negotiation } from "../models/negotiation.js";
import { Negotiations } from "../models/negotiations.js";
export class NegotiationsService {
    constructor() {
        this.negotiations = new Negotiations();
    }
    getDayNegotiations() {
        return fetch("http://localhost:8080/dados")
            .then(res => res.json())
            .then((dados) => {
            return dados.map(dado => {
                return new Negotiation(new Date(), dado.vezes, dado.montante);
            });
        });
    }
    negotiationIsAlreadyOnTheList(negotiation, negotiations) {
        return this.negotiations.list()
            .some(negotiationOfList => negotiationOfList.itIsSame(negotiation));
    }
}

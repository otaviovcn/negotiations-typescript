import { Negotiation } from "../models/negotiation.js";
export class NegotiationsService {
    getDayNegotiations() {
        return fetch("http://localhost:8080/dados")
            .then(res => res.json())
            .then((dados) => {
            return dados.map(dado => {
                return new Negotiation(new Date(), dado.vezes, dado.montante);
            });
        });
    }
}

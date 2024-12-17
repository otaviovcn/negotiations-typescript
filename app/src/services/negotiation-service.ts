import { DayNegotiations } from "../interfaces/day-negotiations.js";
import { Negotiation } from "../models/negotiation.js";
import { Negotiations } from "../models/negotiations.js";


export class NegotiationsService {
  private negotiations = new Negotiations();

  public getDayNegotiations(): Promise<Negotiation[]> {
    return  fetch("http://localhost:8080/dados")
    .then(res => res.json())
    .then((dados: DayNegotiations[]) => {
      return dados.map(dado => {
        return new Negotiation(
          new Date(),
          dado.vezes,
          dado.montante
        );
      })
    })
  }

  public negotiationIsAlreadyOnTheList(negotiation: Negotiation, negotiations: Negotiation[]): boolean {
    return this.negotiations.list()
    .some(negotiationOfList => negotiationOfList.itIsSame(negotiation));
  }
}
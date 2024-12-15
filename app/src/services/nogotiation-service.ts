import { DayNegotiations } from "../interfaces/day-negotiations.js";
import { Negotiation } from "../models/negotiation.js";

export class NegotiationsService {
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
}
import { Negotiation } from "./negotiation"

export class Negotiations {
  private negotiationsList: Negotiation[] = []

  adds(negotiation:Negotiation): void {
    this.negotiationsList.push(negotiation);
    
  }

  list(): readonly Negotiation[] {
    return this.negotiationsList;
  }
}
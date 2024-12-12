import { Negotiation } from "./negotiation"

export class Negotiations {
  private negotiationsList: Negotiation[] = []

  public adds(negotiation:Negotiation): void {
    this.negotiationsList.push(negotiation);
    
  }

  public list(): readonly Negotiation[] {
    return this.negotiationsList;
  }
}
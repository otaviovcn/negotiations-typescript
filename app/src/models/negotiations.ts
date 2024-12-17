import { Model } from "../interfaces/model.js";
import { Negotiation } from "./negotiation.js"

export class Negotiations implements Model<Negotiations> {
  private negotiationsList: Negotiation[] = []
  
  convertToText(): string {
    return JSON.stringify(this.negotiationsList, null, 2);
  }

  public adds(negotiation:Negotiation): void {
    this.negotiationsList.push(negotiation);
    
  }

  public list(): readonly Negotiation[] {
    return this.negotiationsList;
  }

  public itIsSame(negotiations: Negotiations): boolean {
    return JSON.stringify(negotiations.list()) === JSON.stringify(this.negotiationsList)
  }
}

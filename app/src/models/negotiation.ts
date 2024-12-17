import { Model } from "../interfaces/model.js";

export class Negotiation implements Model<Negotiation> {
  constructor(
    private _date: Date,
    readonly quantity: number,
    readonly value: number
  ){}

  get volume(): number {
    return this.quantity * this.value;
  }

  get date(): Date {
    return new Date(this._date.getTime());
  }

  public static createsNegotiation(dateInput: string, quantityInput: string, valueInput: string): Negotiation {
    const exp = /-/g;
    const date = new Date(dateInput.replace(exp, ','));
    const quantity = parseInt(quantityInput);
    const value = parseFloat(valueInput);
    return new Negotiation(date, quantity, value);
  }

  convertToText(): string {
    return `
      data: ${this.date},
      quantity: ${this.quantity},
      value: ${this.value}
    `;
  }

  public itIsSame(negotiation: Negotiation): boolean {
    return negotiation.date.getDate() === this.date.getDate()
        && negotiation.date.getMonth() === this.date.getMonth()
        && negotiation.date.getFullYear() === this.date.getFullYear()
        && negotiation.quantity === this.quantity
        && negotiation.value === this.value;
  }
}
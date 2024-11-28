export class Negotiation {
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
}
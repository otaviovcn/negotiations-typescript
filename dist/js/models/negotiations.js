export class Negotiations {
    constructor() {
        this.negotiationsList = [];
    }
    adds(negotiation) {
        this.negotiationsList.push(negotiation);
    }
    list() {
        return this.negotiationsList;
    }
}

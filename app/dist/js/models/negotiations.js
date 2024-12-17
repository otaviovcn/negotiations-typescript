export class Negotiations {
    constructor() {
        this.negotiationsList = [];
    }
    convertToText() {
        return JSON.stringify(this.negotiationsList, null, 2);
    }
    adds(negotiation) {
        this.negotiationsList.push(negotiation);
    }
    list() {
        return this.negotiationsList;
    }
    itIsSame(negotiations) {
        return JSON.stringify(negotiations.list()) === JSON.stringify(this.negotiationsList);
    }
}

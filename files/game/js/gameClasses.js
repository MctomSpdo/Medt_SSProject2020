class Item {
    name;
    amount;

    constructor(name, amount) {
        this.name = name;
        if(amount < 0 || amount > 64) {
            console.error('[ERROR][ITEM]: Amount must been between 1 - 64');
            return;
        }
        this.amount = amount;
    }

    log() {
        console.log(`[INFO][ITEM]: ${this.name} x ${this.amount}`);
    }
}

class Inventory {
    array = new Array(new Item(), 20);

}
const uuid4 = require('uuid4');

class Item {
    constructor(name){
        this.id = uuid4();
        this.name = name;
        this.value = 0;
    }
}

module.exports = Item;
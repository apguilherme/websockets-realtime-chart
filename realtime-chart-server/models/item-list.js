const Item = require('./item')
class ItemList {

    constructor(){
        this.items = [
            new Item("Data #1"),
            new Item("Data #2"),
            new Item("Data #3"),
            new Item("Data #4"),
            new Item("Data #5"),
        ]
    }

    addItem(name) {
        const newItem = new Item(name);
        this.items.push(newItem);
        return this.items;
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id)
        return this.items;
    }

    getItems(id) {
        return this.items;
    }
    
    increaseValue(id) {
        this.items = this.items.map(item => {
            if (item.id === id) item.value += 1;
            return item;
        })
        return this.items;
    }

    decreaseValue(id) {
        this.items = this.items.map(item => {
            if (item.id === id) item.value -= 1;
            return item;
        })
        return this.items;
    }

    changeName(id, name) {
        this.items = this.items.map(item => {
            if (item.id === id) item.name = name;
            return item;
        })
        return this.items;
    }

}

module.exports = ItemList;
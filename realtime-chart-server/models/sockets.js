const ItemList = require('./item-list');

class Sockets {
    
    constructor(io) {
        this.io = io;
        this.itemList = new ItemList();
        this.events();
    }

    events() {
        this.io.on('connection', (socket) => { // socket = client

            console.log("> connection, user ID:", socket.id); // id changes on every connection
            socket.emit('connected-msg', { 'msg': 'user connected', 'id': socket.id, 'timestamp': new Date().toISOString() });
            socket.emit('current-items', { 'msg': 'current items', 'list': this.itemList, 'timestamp': new Date().toISOString() });

            socket.on('add-item', (item) => {
                console.log('>> item received:', item);
                this.itemList.addItem(item);
                this.io.emit('current-items', { 'msg': 'current items', 'list': this.itemList, 'timestamp': new Date().toISOString() });
            });

            socket.on('increase-value', (id) => {
                console.log('>> increase-value:', id);
                this.itemList.increaseValue(id);
                this.io.emit('current-items', { 'msg': 'current items', 'list': this.itemList, 'timestamp': new Date().toISOString() });
            });

            socket.on('decrease-value', (id) => {
                console.log('>> decrease-value:', id);
                this.itemList.decreaseValue(id);
                this.io.emit('current-items', { 'msg': 'current items', 'list': this.itemList, 'timestamp': new Date().toISOString() });
            });

            socket.on('update-name', (item) => {
                console.log('>> update-name:', item);
                this.itemList.changeName(item.id, item.name);
                this.io.emit('current-items', { 'msg': 'current items', 'list': this.itemList, 'timestamp': new Date().toISOString() });
            });

            socket.on('remove-item', (id) => {
                console.log('>> remove-item:', id);
                this.itemList.removeItem(id);
                this.io.emit('current-items', { 'msg': 'current items', 'list': this.itemList, 'timestamp': new Date().toISOString() });
            });

        });
    }
}

module.exports = Sockets;
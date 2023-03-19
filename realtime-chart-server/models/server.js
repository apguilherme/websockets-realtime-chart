const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors')

class Server {

    constructor(PORT) {
        this.app = express();
        this.port = PORT;
        this.server = http.createServer(this.app);
        this.io = socketio(this.server, {});
    }

    middlewares(){
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        this.app.use(cors());
    }

    socketsConfig() {
        new Sockets(this.io);
    }

    execute(){
        this.middlewares();
        this.socketsConfig();
        this.server.listen(this.port, () => {
            console.log(`server listening on port: http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;
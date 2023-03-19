const PORT = 8080;
const Server = require('./models/server')
const server = new Server(PORT);
server.execute();

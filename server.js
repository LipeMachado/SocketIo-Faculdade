const http = require('http');
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Server is running');
});

const io = require('socket.io')(server);

const clients = {};

io.on('connection', (socket) => {
  console.log('A client has connected');

  socket.on('addClient', (data) => {
    clients[data.nome] = data;
    console.log(`Client added: ${data.nome}`);
    io.emit('updateClients', Object.keys(clients));
  });

  socket.on('removeClient', (nome) => {
    if (clients[nome]) {
      delete clients[nome];
      console.log(`Client removed: ${nome}`);
      io.emit('updateClients', Object.keys(clients));
    }
  });

  socket.on('getClient', (nome) => {
    const client = clients[nome];
    socket.emit('clientInfo', client || null);
  });

  socket.on('disconnect', () => {
    console.log('A client has disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

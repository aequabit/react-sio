import * as http from 'http';
import * as socketio from 'socket.io';

const server = http.createServer();
const io = socketio(server);

io.on('connection', socket => {
    socket.on('test', () => {
        setTimeout(() => socket.emit('test', {foo: 1, bar: 3, baz: 3, qux: 7 }), 2500);
    });
});

server.listen(8080);

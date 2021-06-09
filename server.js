// Imports

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const compression = require('compression');
const minify = require('express-minify');

// File imports

const config = require('./config.js');

// Express middlewares

app.use(compression());
app.use(minify());
app.use(express.static('public'));

// API Routes

app.get('*', function (req, res) {
    // The 404 Route (ALWAYS Keep this as the last route)
    res.redirect('https://cryptochat.dev');
});


// SocketIO

io.on('connection', (socket) => {
    socket.on('chat event', (data) => {
        try {
            JSON.parse(x);
        } catch (e) {
            json = false
        }
        if (typeof data === 'object' || json == true) {
            io.emit('my response', data);
            return
        }
        console.log("Event was rejected." + data)
    });

    socket.on('join', (room) => {
        socket.join(room);
        console.log(`Socket ${socket.id} joining ${room}.`)
    });

    socket.on('disconnect', () => {
        console.log(`Disconnected: ${socket.id}.`)
    })
});


// Server start

server.listen(config.webserver.port, config.webserver.host, () => {
    console.log('listening on *:' + config.webserver.port);
});

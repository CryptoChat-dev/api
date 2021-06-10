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
    res.redirect(config.webserver.splash);
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
            if (data.roomName === null || data.user_name === undefined || data.message === undefined) {
                return;
            }
            io.to(data.roomName).emit('chat response', {user_name: data.user_name, message: data.message});
            return;
        }
        console.log(`${now} - Event was rejected: ${data}`)
    });

    socket.on('join', (room) => {
        socket.join(room);
    });

    socket.on('file event', (data) => {
        if (config.api.fileUpload === true) {
            try {
                JSON.parse(x);
            } catch (e) {
                json = false
            }
            if (typeof data === 'object' || json == true) {
                if (data.roomName === null || data.user_name === undefined || data.name === undefined || data.data === undefined) {
                    return;
                }
                io.to(data.roomName).emit('file response', {user_name: data.user_name, name: data.name, data: data.data});
                return;
            }
            var now = new Date();
            console.log(`${now} - Event was rejected.`)
        }
    })
});


// Server start

server.listen(config.webserver.port, config.webserver.host, () => {
    console.log('listening on *:' + config.webserver.port);
});

// Imports

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {maxHttpBufferSize: 6e6});
const compression = require('compression');
const minify = require('express-minify');
var ss = require('socket.io-stream');

// File imports

const config = require('./config.js');

// Express middlewares

app.use(compression());
app.use(minify());
app.use(express.static('public'));

// API Routes

app.get('*', function (req, res) { // The 404 Route (ALWAYS Keep this as the last route)
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
            var now = new Date();
            if (data.roomName === null || data.user_name === undefined || data.message === undefined) {
                console.log(`${now} - Event had invalid fields.`)
                return;
            }
            io.to(data.roomName).emit('chat response', {
                user_name: data.user_name,
                message: data.message
            });
            return;
        }
        console.log(`${now} - Event was rejected: ${data}`)
    });

    socket.on('join', (data) => {
        try {
            JSON.parse(x);
        } catch (e) {
            json = false
        }
        if (typeof data === 'object' || json == true) {
            var now = new Date();
            if (data.roomName === null || data.user_name === undefined) {
                console.log(`${now} - Event had invalid fields.`)
                return;
            }
            socket.join(data.roomName);
            io.to(data.roomName).emit('join response', {
                user_name: data.user_name
            });
            return;
        }
        console.log(`${now} - Event was rejected: ${data}`)
    });

    socket.on('leave', (data) => {
        socket.disconnect();
        try {
            JSON.parse(x);
        } catch (e) {
            json = false
        }
        if (typeof data === 'object' || json == true) {
            var now = new Date();
            if (data.roomName === null || data.user_name === undefined) {
                console.log(`${now} - Event had invalid fields.`)
                return;
            }
            io.to(data.roomName).emit('leave response', {
                user_name: data.user_name
            });
            return;
        }
        console.log(`${now} - Event was rejected: ${data}`)
    });

    // socket.on('file event', (data) => {
    //     if (config.api.fileUpload === true) {
    //         try {
    //             JSON.parse(x);
    //         } catch (e) {
    //             json = false
    //         }
    //         if (typeof data === 'object' || json == true) {
    //             var now = new Date();
    //             if (data.roomName === undefined || data.uid === undefined || data.user_name === undefined || data.name === undefined || data.type === undefined || data.data === undefined) {
    //                 console.log(`${now} - Event had invalid fields.`)
    //                 return;
    //             }
    //             io.to(data.roomName).emit('file response', {
    //                 user_name: data.user_name,
    //                 name: data.name,
    //                 type: data.type,
    //                 data: data.data,
    //                 uid: data.uid
    //             });
    //             return;
    //         }
    //         console.log(`${now} - Event was rejected.`)
    //     }
    // })

    
});

ss(socket).on('file event', function(stream, data) {
    
    io.to(data.roomName).emit('file response', {
        user_name: data.user_name,
        name: data.name,
        type: data.type,
        data: data.data,
        uid: data.uid
    });
});

// Server start

server.listen(config.webserver.port, config.webserver.host, () => {
    console.log('listening on *:' + config.webserver.port);
});

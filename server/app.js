const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http, {
    cors: {
        origin: "*"
    }
});

let position = {
    x: 0,
    y: 0
};

Socketio.on("connection", socket => {
    socket.emit("position", position);

    socket.on("draw", data => {
        Socketio.emit("position", data);
    })
});

Http.listen(3000, () => {
    console.log("Listening at :3000...");
});



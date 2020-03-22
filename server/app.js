const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4000;

const app = express();

const server = http.createServer(app);

//connect socket io to the server
const io = socketIo(server);

//time function
function time(socket) {
  let d = new Date();
  let s = d.getSeconds();
  let m = d.getMinutes();
  let h = d.getHours();
  socket.emit("data-client", h + ":" + m + ":" + s);
}

//listen for new connections
io.on("connection", socket => {
  console.log("New client connected");
  //emit events to client
  setInterval(() => time(socket), 1000);
  //listen to events from clients
  socket.on("data-server", msg => {
    console.log(msg);
  });
  //disconnect
  socket.on("disconnect", () => console.log("Client disconnected"));
});

app.get("/", (req, res) => {
  res.send({ response: "Hello World!" }).status(200);
});

server.listen(port, error => {
  if (error) return;
  console.log(`Listening on port ${port}`);
});

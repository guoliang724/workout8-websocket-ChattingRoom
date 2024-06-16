const { Server } = require("socket.io");

const history = []; // chat history {name:string, content:string, date: number}
let nextId = 1; // next user id
const users = new Set(); // user sets

const io = new Server({
  path: "/",
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  const username = `passenger${nextId++}`;
  users.add(username);
  io.emit("$updateUser", [...users]);
  socket.emit("$history", history);
  socket.emit("$name", username);

  socket.on("$message", (content) => {
    const msg = {
      name: username,
      content,
      date: Date.now(),
    };
    history.push(msg);
    socket.broadcast.emit("$message", msg);
  });

  socket.on("disconnect", () => {
    users.delete(username);
    socket.broadcast.emit("$updateUser", [...users]);
  });
});

io.listen(9528);
console.log(`Socket.io, Chatting Room is ready, port: 9528`);

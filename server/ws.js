const { WebSocketServer } = require("ws");

function createServer(port) {
  return new Promise(function (resolve) {
    const wss = new WebSocketServer(
      {
        port,
      },
      () => {
        resolve(wss);
      }
    );
  });
}

let count = 0;

async function init(port) {
  const wss = await createServer(port);
  console.log(`native WebSocket service is start, port: ${port}`);
  wss.on("connection", (socket) => {
    socket.on("message", (message) => {
      socket.send("You are amazing");
    });
  });
  const timer = setInterval(() => {
    count++;
    wss.clients.forEach((ws) => {
      ws.send(`from server: ${count}`);
    });
  }, 3000);
  wss.on("close", () => {
    clearInterval(timer);
  });
}

init(9527);

import WebSocket from "ws";
import http from "http";

const wsServer = new WebSocket.Server({ noServer: true });

const initWsServer = (
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
) => {
  wsServer.on("connection", (socket) => {
    console.info("WebSocket connection established");

    socket.on("close", () => {
      console.info("WebSocket connection closed");
    });
  });

  server.on("upgrade", (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (socket) => {
      wsServer.emit("connection", socket, request);
    });
  });
};

export { wsServer, initWsServer };

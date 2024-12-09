import { wsServer } from "../constructors/websocket";
import WebSocket from "ws";

class WSFacade {
  wsServer = wsServer;

  anonceAll<T>(msg: T) {
    wsServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: "new_message", data: msg }));
      }
    });
  }
}

export const wsFacade = new WSFacade();

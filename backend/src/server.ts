import express, { Request, Response } from "express";
import http from "http";
import { initWsServer } from "./constructors/websocket";
import { PORT } from "./config";
import { initMongoDB } from "./constructors/mongo-db";
import { MessagesService } from "./services/messages";

const app = express();
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

initMongoDB();

const messagesService = new MessagesService();

app.post("/messages", (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text) {
    res.status(400).send("Text is required");
  }

  messagesService.addMessage(text);

  res.send("Message received");
});

app.get("/messages", async (req: Request, res: Response) => {
  res.json(await messagesService.getMessages());
});

const server = http.createServer(app);

initWsServer(server);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

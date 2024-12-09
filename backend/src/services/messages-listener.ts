import Message from "../models/message";
import { MessageDTO } from "../types/message";
import { ChangeStream } from "mongodb";

export class MessagesListener {
  private messageEmitter: ChangeStream<any, any>;

  constructor() {
    this.messageEmitter = Message.watch();
  }

  subscribeInserts(
    callback: (change: {
      operationType: "insert";
      fullDocument: MessageDTO;
    }) => void
  ) {
    this.messageEmitter.on("change", (change) => {
      if (change.operationType === "insert") {
        callback(change);
      }
    });
  }
}

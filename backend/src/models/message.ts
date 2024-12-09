import { Schema, model, Document } from "mongoose";
import { MessageDTO } from "../types/message";

const messageSchema = new Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Message = model<MessageDTO>("Message", messageSchema);

export default Message;

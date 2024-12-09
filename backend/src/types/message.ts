export interface MessageOnBuffer {
  text: string;
}

export interface MessageDTO extends Document, MessageOnBuffer {
  createdAt: Date;
}

import { BATCH_SIZE, TIMEOUT } from "../config";
import { wsFacade } from "../facades/ws";
import Message from "../models/message";
import { MessageDTO } from "../types/message";
import { MessagesCacheService } from "./messages-cache";
import { MessagesListener } from "./messages-listener";

export class MessagesService {
  private timeout: NodeJS.Timeout | null = null;
  private messageCacheService: MessagesCacheService;
  private messagesListener: MessagesListener;
  private wsFacade = wsFacade;

  constructor() {
    this.messageCacheService = new MessagesCacheService();
    this.messagesListener = new MessagesListener();

    this.messagesListener.subscribeInserts(async ({ fullDocument }) => {
      this.wsFacade.anonceAll(fullDocument);
    });

    // Save messages from cache on start
    this.saveMessages();
  }

  async addMessage(message: string) {
    this.messageCacheService.addMessage(message);

    this.validateBatchLimitations();
  }

  async validateBatchLimitations() {
    if ((await this.messageCacheService.getMessagesCount()) >= BATCH_SIZE) {
      this.saveMessages();
    } else if (!this.timeout) {
      this.timeout = setTimeout(async () => {
        await this.saveMessages();
        this.timeout = null;
      }, TIMEOUT);
    }
  }

  async saveMessages() {
    if ((await this.messageCacheService.getMessagesCount()) === 0) {
      return;
    }

    const messages = await this.messageCacheService.getMessages();

    await Message.insertMany(messages);

    this.messageCacheService.clearMessages();
  }

  getMessages(): Promise<MessageDTO[]> {
    return Message.find();
  }
}

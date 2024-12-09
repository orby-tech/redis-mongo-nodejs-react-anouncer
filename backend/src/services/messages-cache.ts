import { MessageOnBuffer } from "../types/message";
import { CacheService } from "./cache";

export class MessagesCacheService {
  private cacheService: CacheService;

  constructor() {
    this.cacheService = new CacheService("messages");
  }

  async getMessages(): Promise<MessageOnBuffer[]> {
    return (await this.cacheService.getAll()).map(
      (message) => ({ text: message } as MessageOnBuffer)
    );
  }

  async addMessage(message: string) {
    this.cacheService.add(message);
  }

  async getMessagesCount() {
    return this.cacheService.length();
  }

  async clearMessages() {
    this.cacheService.clear();
  }
}

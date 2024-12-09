import { redisFacade } from "../facades/redis";

export class CacheService {
  readonly backet: string;

  private redisFacade = redisFacade;

  constructor(backet: string) {
    this.backet = backet;
  }

  async getAll(): Promise<string[]> {
    return await this.redisFacade.client.lRange(this.backet, 0, -1);
  }

  async add(value: string) {
    this.redisFacade.client.rPush(this.backet, value);
  }

  async length() {
    return this.redisFacade.client.lLen(this.backet);
  }

  async clear() {
    this.redisFacade.client.del(this.backet);
  }
}

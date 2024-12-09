import { createClient, RedisClientType } from "redis";
import { REDIS_PATH } from "../config";

class RedisFacade {
  client: RedisClientType;
  constructor() {
    this.client = createClient({
      url: REDIS_PATH,
    });

    this.client.on("error", (err) => console.log("Redis Client Error", err));

    this.client.connect();
  }
}

export const redisFacade = new RedisFacade();

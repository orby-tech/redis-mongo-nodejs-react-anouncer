// TODO: Move to .env file

export const MONGODB_URI = "mongodb://localhost:27017/?replicaSet=rs0";
export const BATCH_SIZE = 10;
export const TIMEOUT = 1000;
export const PORT = 3002;
export const REDIS_HOST = "localhost";
export const REDIS_PORT = 6379;
export const REDIS_PASSWORD = "eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81";
export const REDIS_PATH = `redis://:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`;

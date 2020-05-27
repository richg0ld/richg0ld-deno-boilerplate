import { init, MongoClient } from "https://deno.land/x/mongo@v0.6.0/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

// Initialize the plugin
await init();

const {
  DB_MONGO_USERNAME,
  DB_MONGO_PASSWORD,
  DB_MONGO_HOST,
  DB_MONGO_PORT,
  DB_MONGO_DATABASE
} = config();

const client = new MongoClient();

const connect = () => {
  const databaseUrl = `mongodb://${DB_MONGO_USERNAME}:${DB_MONGO_PASSWORD}@${DB_MONGO_HOST}:${DB_MONGO_PORT}/${DB_MONGO_DATABASE}?authSource=admin`;
  const client = new MongoClient();
  client.connectWithUri(databaseUrl);
};

const getDatabase = () => {
  return client.database(DB_MONGO_DATABASE);
};

export default {
  connect,
  getDatabase
};

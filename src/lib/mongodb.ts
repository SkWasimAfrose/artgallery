import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables.");
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithCache = globalThis as typeof globalThis & {
  __mongooseCache?: MongooseCache;
};

const mongoUri: string = MONGODB_URI;

const cache: MongooseCache =
  globalWithCache.__mongooseCache ??
  (globalWithCache.__mongooseCache = { conn: null, promise: null });

export async function connectToDatabase() {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(mongoUri, {
      bufferCommands: false,
    });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var __mongooseCache: MongooseCache | undefined;
}

import mongoose from "mongoose";

let cache = global.mongooseCache;

if (!cache) {
  cache = global.mongooseCache = { conn: null, promise: null };
}

async function dbConnect() {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(`${process.env.MONGODB_URI}/kereshmehsaadati`, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}

export default dbConnect;

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://showrural:FZDNAxqPRn3KjJIv@showrural.dmjad.mongodb.net/ShowRural?retryWrites=true&w=majority";

if (!MONGODB_URI) {
  throw new Error("⚠️ MongoDB URI não encontrado!");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "ShowRural",
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

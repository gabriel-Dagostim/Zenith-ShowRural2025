import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://showrural:FZDNAxqPRn3KjJIv@showrural.dmjad.mongodb.net/?retryWrites=true&w=majority&appName=ShowRural";

if (!MONGODB_URI) {
  throw new Error("⚠️ MongoDB URI não encontrado!");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "ShowRural",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

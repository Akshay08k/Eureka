// lib/clientPromise.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

if (!uri) {
  throw new Error("❌ Please add your Mongo URI to .env.local");
}

// Log to debug connection state
// console.log("➡️ [clientPromise] Mongo URI:", uri);

let client;
let clientPromise: Promise<MongoClient>;

// Attach to global object in dev to reuse the connection across HMR reloads
declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    // console.log("🛠️ [clientPromise] Creating new MongoClient (DEV)");
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  } else {
    console.log("✅ [clientPromise] Reusing existing MongoClient (DEV)");
  }
  clientPromise = global._mongoClientPromise;
} else {
  // console.log("🛫 [clientPromise] Creating new MongoClient (PROD)");
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

clientPromise
  .then(() => {
    // console.log("✅ [clientPromise] MongoClient connected successfully");
  })
  .catch((err) => {
    // console.error("❌ [clientPromise] MongoClient connection failed:", err);
  });

export default clientPromise;

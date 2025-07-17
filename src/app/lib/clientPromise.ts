// lib/clientPromise.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

if (!uri) {
  throw new Error("Mongo Uri not found");
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
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  } else {
    console.log("✅ [clientPromise] Reusing existing MongoClient (DEV)");
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI, {
  family: 4, // ✅ Force IPv4 DNS resolution
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
});

// ✅ Must await the connection before using the db
await client.connect();

const db = client.db("paw-heaven");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  advanced: {
    cookiePrefix: "paw_heaven", // Changes cookie name to avoid conflicts
  },
});

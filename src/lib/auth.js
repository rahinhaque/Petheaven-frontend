import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

// ✅ ADD THIS — forces SRV lookups to use IPv4 too
import { setDefaultAutoSelectFamily } from "net";
setDefaultAutoSelectFamily(false); // Node 18.13+ / 20+

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI, {
  family: 4,
  serverSelectionTimeoutMS: 15000,
  connectTimeoutMS: 15000,
  // ✅ ADD these — helps with SRV resolution behind restrictive networks
  directConnection: false,
  tls: true,
});

await client.connect();
const db = client.db("paw-heaven");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  advanced: {
    cookiePrefix: "paw_heaven",
  },
});

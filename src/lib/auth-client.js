// lib/auth-client.js
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000", // ✅ only NEXT_PUBLIC_ works client-side
});

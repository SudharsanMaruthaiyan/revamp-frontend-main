import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      name?: string | null;
      email?: string | null;
      access_token: string;
      refresh_token: string;
    } & DefaultSession["user"];
    error?: string;
  }

  interface User {
    userId: string;
    name?: string | null;
    email?: string | null;
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name?: string | null;
    email?: string | null;
    accessToken?: string;
    refreshToken?: string;
    error?: string;
  }
}
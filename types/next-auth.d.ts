import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    userName: string;
  }

  interface Session {
    user: User;
    accessToken?: string;
  }
}

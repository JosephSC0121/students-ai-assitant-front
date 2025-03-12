import { JWT } from "next-auth/jwt";
import { User } from "next-auth";

export const jwtCallback = async ({
  token,
  user,
}: {
  token: JWT;
  user?: User;
}): Promise<JWT> => {
  if (user) {
    token.id = user.id;
    token.userName = user.userName;
  }
  return token;
};

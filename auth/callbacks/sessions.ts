import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export const sessionCallback = async ({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}): Promise<Session> => {
  if (session.user) {
    session.user.id = token.id as string;
    session.user.userName = token.userName as string;
  }

  (session as any).accessToken = token.accessToken as string | undefined;

  return session;
};

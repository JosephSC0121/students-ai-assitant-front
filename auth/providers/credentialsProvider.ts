import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "../services/loginUser";

interface Credentials {
  userName: string;
  password: string;
}

export const credentialsProvider = CredentialsProvider({
  name: "Credentials",
  credentials: {
    userName: {
      label: "Nombre de usuario",
      type: "text",
    },
    password: { label: "Contraseña", type: "password" },
  },
  async authorize(credentials) {
    if (!credentials || !credentials.userName || !credentials.password) {
      throw new Error("Nombre de usuario y contraseña son obligatorios");
    }

    const userCredentials: Credentials = {
      userName: String(credentials.userName),
      password: String(credentials.password),
    };

    const user = await loginUser(userCredentials);
    if (!user) throw new Error("Credenciales inválidas");
    return user;
  },
});

interface Credentials {
  userName: string;
  password: string;
}

const backendUrl = process.env.BACKEND_URL || "";
export async function loginUser(credentials: Credentials) {
  try {
    const authResponse = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: credentials.userName,
        password: credentials.password,
      }),
    });

    if (!authResponse.ok) {
      return null;
    }
    return await authResponse.json();
  } catch (error) {
    return null;
  }
}

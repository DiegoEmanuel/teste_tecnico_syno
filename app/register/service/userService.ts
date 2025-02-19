const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface User {
  name: string;
  email: string;
  password: string;
}

export async function createUser(data: User) {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Erro ao criar conta");
  }

  return result;
}

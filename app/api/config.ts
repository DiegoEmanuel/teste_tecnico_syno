import CredentialsProvider from "next-auth/providers/credentials";
import { API_URL } from "@/app/constants/env";

export const credentials = CredentialsProvider({
    name: "Credentials",
    credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
            throw new Error('Credenciais necessárias');
        }

        try {
            // Remova a barra final da URL se existir
            const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;

            const response = await fetch(`${baseUrl}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Erro na resposta:', data);
                throw new Error(data.message || 'Falha na autenticação');
            }

            if (!data.token) {
                throw new Error('Token não encontrado na resposta');
            }

            return {
                id: data.user.id,
                email: data.user.email,
                accessToken: data.token,
            };
        } catch (error) {
            console.error('Erro completo:', error);
            throw new Error('Falha na autenticação');
        }
    }
})


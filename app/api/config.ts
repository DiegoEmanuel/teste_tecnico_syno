import { API_URL } from '../constants/env';

interface AuthorizeProps {
    email: string;
    password: string;
}

interface AuthResponse {
    user: {
        id: string;
        name: string;
        email: string;
    };
    token: string;
}

export async function authorize({ email, password }: AuthorizeProps): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Falha na autenticação');
    }

    return data;
}


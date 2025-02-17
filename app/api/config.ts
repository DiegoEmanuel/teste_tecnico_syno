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
    console.log('Tentando autenticar com API:', `${API_URL}/users/login`);
    
    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log('Resposta da API:', data);

    if (!response.ok) {
        throw new Error(data.message || 'Falha na autenticação');
    }

    return data;
}


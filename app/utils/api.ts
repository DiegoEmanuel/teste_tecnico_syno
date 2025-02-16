import { getSession } from 'next-auth/react';
import { API_URL } from '../constants/env';


interface FetchWithAuthOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
  'Content-Type'?: string;
}

export async function fetchWithAuth(endpoint: string, options: FetchWithAuthOptions = {}) {

  const session = await getSession();
  if (!session?.user.accessToken) {
    console.log('Não autorizado');

    throw new Error('Não autorizado');
  }

  const headers = {
    // 'Content-Type': options['Content-Type'] || 'application/json',
    'Authorization': `Bearer ${session.user.accessToken}`,
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok && response.status !== 204 && response.status !== 200) {
    throw new Error('Erro na requisição');
  }

  return response.json();
} 
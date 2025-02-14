import { getSession, signOut } from 'next-auth/react';
import { API_URL } from '../constants/env';
import router from 'next/router';

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {

  const session = await getSession();
  if (!session?.user.accessToken) {
    console.log('Não autorizado');

    throw new Error('Não autorizado');
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session.user.accessToken}`,
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error('Erro na requisição');
  }

  return response.json();
} 
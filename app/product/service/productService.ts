import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Product {
  codigo_produto: string;
  descricao_produto: string;
  status: boolean;
  foto_produto: string;
}

export async function getProduct(id: string) {
  const session = await getSession();
  if (!session?.user.accessToken) throw new Error('Não autorizado');

  const response = await fetch(`${API_URL}/products/${id}`, {
    headers: {
      'Authorization': `Bearer ${session.user.accessToken}`
    }
  });

  if (!response.ok) throw new Error('Erro ao buscar produto');
  return response.json();
}

export async function updateProduct(id: string, data: Partial<Product>, file?: File | null) {
  const session = await getSession();
  if (!session?.user.accessToken) throw new Error('Não autorizado');

  let body: FormData | string;
  const headers: HeadersInit = {
    'Authorization': `Bearer ${session.user.accessToken}`
  };

  if (file) {
    body = new FormData() as FormData;
    Object.entries(data).forEach(([key, value]) => {
      (body as FormData).append(key, value as string);
    });
    (body as FormData).append('foto_produto', file);
  } else {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(data);
  }

  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers,
    body
  });

  if (!response.ok) throw new Error('Erro ao atualizar produto');
  return response.json();
}

export async function deleteProduct(id: string) {
  const session = await getSession();
  if (!session?.user.accessToken) throw new Error('Não autorizado');

  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${session.user.accessToken}`
    }
  });

  if (!response.ok) throw new Error('Erro ao deletar produto');
  return response.json();
}

export async function createProduct(data: Partial<Product>, file?: File | null) {
  const session = await getSession();
  if (!session?.user.accessToken) throw new Error('Não autorizado');

  const formData = new FormData();
  formData.append('codigo_produto', data.codigo_produto || '');
  formData.append('descricao_produto', data.descricao_produto || '');
  

  if (file) {
    formData.append('foto_produto', file);
  }

  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session.user.accessToken}`
    },
    body: formData
  });

  if (!response.ok) throw new Error('Erro ao criar produto');
  return response.json();
}

export async function deleteProductImage(id: string) {
  const session = await getSession();
  if (!session?.user.accessToken) throw new Error('Não autorizado');

  const response = await fetch(`${API_URL}/products/${id}/image`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${session.user.accessToken}`
    }
  });

  if (!response.ok) throw new Error('Erro ao deletar imagem');
  return response.json();
} 
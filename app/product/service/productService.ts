import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Product {
  codigo_produto: string;
  descricao_produto: string;
  status: boolean;
  foto_produto: string;
}

async function getAuthHeaders(additionalHeaders: HeadersInit = {}): Promise<HeadersInit> {
  const session = await getSession();
  if (!session?.user.accessToken) throw new Error('Não autorizado');
  return {
    'Authorization': `Bearer ${session.user.accessToken}`,
    ...additionalHeaders,
  };
}

export async function getProduct(id: string) {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_URL}/products/${id}`, { headers });
  if (!response.ok) throw new Error('Erro ao buscar produto');
  return response.json();
}

export async function updateProduct(id: string, data: Partial<Product>, file?: File | null) {
  const headers = await getAuthHeaders();
  const formData = new FormData();
  formData.append('codigo_produto', data.codigo_produto!);
  formData.append('descricao_produto', data.descricao_produto!);
  formData.append('status', String(data.status));
  
  if (file) {
    formData.append('foto_produto', file);
  }

  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers, // Não defina 'Content-Type' ao usar FormData
    body: formData
  });

  if (!response.ok) {
    const responseData = await response.json();
    throw new Error(responseData.error);
  }
  return response.json();
}

export async function deleteProduct(id: string) {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers
  });

  if (!response.ok) throw new Error('Erro ao deletar produto');
  return response.json();
}

export async function createProduct(data: Partial<Product>, file?: File | null) {
  const headers = await getAuthHeaders({ 'Accept': 'application/json' });
  const formData = new FormData();
  formData.append('codigo_produto', data.codigo_produto!);
  formData.append('descricao_produto', data.descricao_produto!);
  formData.append('status', 'true');
  
  if (file) {
    formData.append('foto_produto', file);
  }

  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers,
    body: formData
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.error);
  }

  return responseData;
}

export async function deleteProductImage(id: string) {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_URL}/products/${id}/image`, {
    method: 'DELETE',
    headers
  });

  if (!response.ok) throw new Error('Erro ao deletar imagem');
  return response.json();
}

'use client';

import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateProductPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [codigoProduto, setCodigoProduto] = useState('');
  const [descricaoProduto, setDescricaoProduto] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('codigo_produto', codigoProduto);
    formData.append('descricao_produto', descricaoProduto);


    if (file) {
      formData.append('foto_produto', file);
    } 

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.user.accessToken}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erro ao criar produto');
      }

      router.push('/product');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ocorreu um erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Criar Produto</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Código do Produto</label>
          <input
            type="text"
            value={codigoProduto}
            onChange={(e) => setCodigoProduto(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Descrição do Produto</label>
          <textarea
            value={descricaoProduto}
            onChange={(e) => setDescricaoProduto(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Imagem do Produto</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-green-300"
          >
            {loading ? 'Criando...' : 'Criar Produto'}
          </button>
        </div>
      </form>
    </div>
  );
}
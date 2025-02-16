'use client';

import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { deleteProduct } from '@/app/api/product/productService';

export default function EditProductPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params?.id?.toString() || '';

  const [formData, setFormData] = useState({
    codigo_produto: '',
    descricao_produto: '',
    status: true,
    foto_produto: ''
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [changedFields, setChangedFields] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchProduct() {
      if (!id || !session?.user.accessToken) return;

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
          headers: {
            'Authorization': `Bearer ${session.user.accessToken}`
          }
        });
        if (!response.ok) throw new Error('Erro ao buscar produto');

        const data = await response.json();
        setFormData(data);
      } catch (err) {
        console.error('Erro ao buscar produto:', err);
        setError('Erro ao buscar produto');
      }
    }

    fetchProduct();
  }, [id, session?.user.accessToken]);

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      await deleteProduct(id);
      router.push('/product');
    } catch (err) {
      setError('Erro ao excluir produto');
      console.error('Erro ao excluir:', err);
    }
  };

  const handleFieldChange = (name: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setChangedFields(prev => new Set(prev).add(name));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response;
      const changedData: Record<string, any> = {};
      changedFields.forEach(field => {
        changedData[field] = formData[field as keyof typeof formData];
      });

      if (file) {
        const form = new FormData();
        Object.entries(changedData).forEach(([key, value]) => {
          form.append(key, value.toString());
        });
        form.append('foto_produto', file);

        response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${session?.user.accessToken}`
          },
          body: form
        });
      } else if (Object.keys(changedData).length > 0) {
        response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user.accessToken}`
          },
          body: JSON.stringify(changedData)
        });
      } else {
        router.push('/product');
        return;
      }

      if (!response.ok) {
        throw new Error('Erro ao atualizar produto');
      }
      router.push('/product');
    } catch (err: any) {
      console.error('Erro:', err);
      setError('Erro ao atualizar produto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Editar Produto</h1>
      {error && <div className="bg-red-50 text-red-500 p-4 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Código do Produto</label>
          <input
            type="text"
            value={formData.codigo_produto}
            onChange={(e) => handleFieldChange('codigo_produto', e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Descrição</label>
          <textarea
            value={formData.descricao_produto}
            onChange={(e) => handleFieldChange('descricao_produto', e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Status</label>
          <select
            value={formData.status.toString()}
            onChange={(e) => handleFieldChange('status', e.target.value === 'true')}
            className="w-full p-2 border rounded"
          >
            <option value="true">Ativo</option>
            <option value="false">Inativo</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">Imagem do Produto</label>
          {formData.foto_produto && !file && (
            <div className="mb-2">
              <img
                src={formData.foto_produto}
                alt="Imagem do Produto"
                className="w-48 h-48 object-cover rounded border"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full p-2 border rounded"
          />
          {file && (
            <p className="mt-2 text-sm text-gray-600">
              Nova imagem selecionada: {file.name}
            </p>
          )}
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Deletar
          </button>
          <button
            type="button"
            onClick={() => router.push('/product')}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

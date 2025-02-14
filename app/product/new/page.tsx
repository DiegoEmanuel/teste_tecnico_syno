'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { fetchWithAuth } from '@/app/utils/api';

type ProductFormData = {
  codigo_produto: string;
  descricao_produto: string;
  foto_produto?: string;
};

export default function NewProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { 
    register, 
    handleSubmit,
    formState: { errors }
  } = useForm<ProductFormData>({
    defaultValues: {
      foto_produto: 'https://placehold.co/400x400'
    }
  });

  async function onSubmit(data: ProductFormData) {
    setError('');
    setLoading(true);

    const productData = {
      ...data,
      status: true
    };

    try {
      await fetchWithAuth('/products', {
        method: 'POST',
        body: JSON.stringify(productData),
      });
      
      router.push('/product');
    } catch (error) {
      setError('Erro ao criar produto. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Novo Produto</h1>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* UTILIZEI O REACT HOOK FORM PARA CRIAR O FORMULARIO */}
        <div>
          <label htmlFor="codigo_produto" className="block text-sm font-medium mb-2">
            Código do Produto *
          </label>
          <input
            {...register('codigo_produto', { 
              required: 'Código do produto é obrigatório',
              minLength: {
                value: 1,
                message: 'Código deve ter pelo menos 1 caractere'
              }
            })}
            type="text"
            id="codigo_produto"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
          />
          {errors.codigo_produto && (
            <p className="text-red-500 text-sm mt-1">
              {errors.codigo_produto.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="descricao_produto" className="block text-sm font-medium mb-2">
            Descrição do Produto *
          </label>
          <textarea
            {...register('descricao_produto', { 
              required: 'Descrição do produto é obrigatória',
              minLength: {
                value: 3,
                message: 'Descrição deve ter pelo menos 3 caracteres'
              }
            })}
            id="descricao_produto"
            rows={3}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
          />
          {errors.descricao_produto && (
            <p className="text-red-500 text-sm mt-1">
              {errors.descricao_produto.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="foto_produto" className="block text-sm font-medium mb-2">
            URL da Foto
          </label>
          <input
            {...register('foto_produto', {
              pattern: {
                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: 'URL inválida'
              }
            })}
            type="url"
            id="foto_produto"
            placeholder="https://exemplo.com/imagem.jpg"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
          />
          {errors.foto_produto && (
            <p className="text-red-500 text-sm mt-1">
              {errors.foto_produto.message}
            </p>
          )}
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

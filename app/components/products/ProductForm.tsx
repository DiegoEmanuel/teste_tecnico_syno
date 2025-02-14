'use client';

import { fetchWithAuth } from '@/app/utils/api';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import { DocumentTextIcon, TagIcon } from '@heroicons/react/24/outline';

interface ProductFormData {
  codigo_produto: string;
  descricao_produto: string;
  status: boolean;
  foto_produto?: string;
}

interface ProductFormProps {
  initialData?: {
    codigo_produto?: string;
    descricao_produto?: string;
    status?: boolean;
    foto_produto?: string;
  };
  productId?: string;
}

export function ProductForm({ initialData, productId }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
    defaultValues: {
      codigo_produto: initialData?.codigo_produto,
      descricao_produto: initialData?.descricao_produto || '',
      status: initialData?.status ?? true,
    }
  });

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetchWithAuth('/upload', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      });

      return response.url;
    } catch (error) {
      console.error('Erro no upload:', error);
      throw new Error('Falha ao fazer upload da imagem');
    }
  }

  async function onSubmit(data: any) {
    setError('');
    setLoading(true);

    try {
      let imageUrl = initialData?.foto_produto;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const productData = {
        ...data,
        foto_produto: imageUrl,
      };

      if (productId) {
        await fetchWithAuth(`/products/${productId}`, {
          method: 'PUT',
          body: JSON.stringify(productData),
        });
      } else {
        await fetchWithAuth('/products', {
          method: 'POST',
          body: JSON.stringify(productData),
        });
      }

      router.push('/product');
    } catch (error: any) {
      console.error('Erro completo:', error);
      setError(`Erro ao ${productId ? 'atualizar' : 'criar'} produto. (Verifique se o código do produto já está em).`);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    await fetchWithAuth(`/products/${productId}`, {
      method: 'DELETE',
    });

    router.push('/product');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Código do Produto *"
        icon={<TagIcon className="h-5 w-5 text-gray-400" />}
        {...register('codigo_produto', {
          required: 'Código do produto é obrigatório',
          minLength: {
            value: 1,
            message: 'Código deve ter pelo menos 1 caractere'
          }
        })}
        error={errors.codigo_produto}
        placeholder="Digite o código do produto"
      />

      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descrição do Produto *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <DocumentTextIcon className="h-5 w-5 text-gray-400" />
          </div>
          <textarea
            {...register('descricao_produto', {
              required: 'Descrição do produto é obrigatória',
              minLength: {
                value: 3,
                message: 'Descrição deve ter pelo menos 3 caracteres'
              }
            })}
            className={`
              w-full px-4 py-2 pl-10
              border rounded-md
              bg-white
              text-black
              transition-colors
              focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
              ${errors.descricao_produto ? 'border-red-500' : 'border-gray-300'}
            `}
            rows={3}
            placeholder="Digite a descrição do produto"
          />
        </div>
        {errors.descricao_produto && (
          <p className="mt-1 text-sm text-red-500">
            {errors.descricao_produto.message}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('status')}
            className="w-4 h-4 text-green-500 rounded focus:ring-green-500"
          />
          <span className="text-sm font-medium text-gray-700">Produto Ativo</span>
        </label>
      </div>
      <div className="w-full px-4 py-2 pl-10 border rounded-md bg-white text-black transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">

        {initialData?.foto_produto && (
          <div className="mt-4">
            <img src={initialData.foto_produto} alt="Imagem do Produto" className="w-32 h-32 object-cover rounded-md" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Clique para alterar a imagem do produto
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full px-4 py-2 pl-10 border rounded-md bg-white text-black transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          disabled={loading}
          type="button"
          onClick={() => handleDelete()}
          className="px-4 py-2 text-sm border rounded-md hover:bg-red-100 text-red-500"
        >
          Deletar
        </button>
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
          {loading ? (productId ? 'Editando...' : 'Criando...') : (productId ? 'Editar' : 'Criar')}
        </button>
      </div>
    </form>
  );
} 
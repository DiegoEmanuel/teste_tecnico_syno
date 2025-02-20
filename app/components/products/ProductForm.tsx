'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import InputSyno from '../ui/Input';

export interface ProductData {
  codigo_produto: string;
  descricao_produto: string;
  status: boolean;
  foto_produto: string;
}

interface ProductFormProps {
  initialData: ProductData;
  onSubmit: (data: ProductData, file: File | null) => Promise<void>;
  onDelete?: () => Promise<void>;
}

export default function ProductForm({
  initialData,
  onSubmit,
  onDelete,
}: ProductFormProps) {
  const params = useParams();
  const isEditing = Boolean(params?.id);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<ProductData>({
    defaultValues: initialData
  });

  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  useEffect(() => {
    setValue('codigo_produto', initialData.codigo_produto);
    setValue('descricao_produto', initialData.descricao_produto);
    setValue('status', initialData.status);
  }, [initialData, setValue]);

  const onSubmitForm = async (data: ProductData) => {
    setLoading(true);
    setError('');
    try {
      await onSubmit(data, file);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro ao salvar produto');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      {error && <div className="bg-red-50 text-red-500 p-4 rounded mb-4">{error}</div>}
      
      <div>
        <label className="block mb-2">Imagem do Produto</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <InputSyno
          label="Código do Produto"
          {...register('codigo_produto', {
            required: 'Código do produto é obrigatório'
          })}
        />
        {errors.codigo_produto && (
          <span className="text-red-500 text-sm">{errors.codigo_produto.message}</span>
        )}
      </div>
      <div>
        <InputSyno
          label="Descrição"
          {...register('descricao_produto', {
            required: 'Descrição do produto é obrigatória'
          })}
        />
        {errors.descricao_produto && (
          <span className="text-red-500 text-sm">{errors.descricao_produto.message}</span>
        )}
      </div>
      {isEditing && (
        <div>
          <label className="block mb-2">Status</label>
          <select
            {...register('status')}
            className="w-full p-2 border rounded"
          >
            <option value="true">Ativo</option>
            <option value="false">Inativo</option>
          </select>
        </div>
      )}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
        {isEditing && onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Deletar
          </button>
        )}
        <button
          type="button"
          onClick={() => router.push('/product')}
          className="px-4 py-2 text-blue-500 rounded hover:bg-white border border-blue-500"
        >
          Voltar
        </button>
      </div>
    </form>
  );
}

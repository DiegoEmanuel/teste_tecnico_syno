'use client';

import React, { useEffect } from 'react';
import { useProductForm } from '../../product/hooks/useProductFormHook';
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
  
  const {
    formData,
    setFormData,
    file,
    loading,
    error,
    handleFieldChange,
    setFile,
    setLoading,
    setError,
  } = useProductForm(initialData);

  const router = useRouter();

  useEffect(() => {
    setFormData(initialData);
  }, [initialData, setFormData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await onSubmit(formData, file);
    } catch (err: unknown) {
      console.error('Erro ao salvar produto: verifique se o código está duplicado', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro desconhecido');
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
    <form onSubmit={handleSubmit} className="space-y-4">
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
          required={true}
          value={formData.codigo_produto}
          onChange={(e) => handleFieldChange('codigo_produto', e.target.value)}
        />
      </div>
      <div>
        <InputSyno
          label="Descrição"
          required={true}
          value={formData.descricao_produto}
          onChange={(e) => handleFieldChange('descricao_produto', e.target.value)}
        />
      </div>
      {isEditing && (
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

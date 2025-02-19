'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ProductForm, { ProductData } from '../../components/products/ProductForm';
import { getProduct, updateProduct, deleteProduct } from '../service/productService';
import Image from 'next/image';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id?.toString() || '';

  const [initialData, setInitialData] = useState<ProductData>({
    codigo_produto: '',
    descricao_produto: '',
    status: true,
    foto_produto: '',
  });
  const [pageError, setPageError] = useState('');

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      try {
        const data = await getProduct(id);
        setInitialData(data);
      } catch (err) {
        console.error('Erro ao buscar produto:', err);
        setPageError('Erro ao buscar produto');
      }
    }
    fetchProduct();
  }, [id]);

  const handleSubmit = async (data: ProductData, file: File | null) => {
    try {
      await updateProduct(id, data, file);
      router.push('/product');
    } catch (err) {
      console.error('Erro ao atualizar produto:', err);
      setPageError('Erro ao atualizar produto');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;
    try {
      await deleteProduct(id);
      router.push('/product');
    } catch (err) {
      console.error('Erro ao excluir produto:', err);
      setPageError('Erro ao excluir produto');
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Editar Produto</h1>
      {initialData.foto_produto && (
        <div className="mb-4">
          <Image
            src={initialData.foto_produto}
            alt="Imagem do Produto"
            width={192}
            height={192}
            className="w-48 h-48 object-cover rounded border"
          />
        </div>
      )}
      {pageError && <div className="bg-red-50 text-red-500 p-4 rounded mb-4">{pageError}</div>}
      <ProductForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </div>
  );
}

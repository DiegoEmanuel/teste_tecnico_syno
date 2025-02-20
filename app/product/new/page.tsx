'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import ProductForm, { ProductData } from '../../components/products/ProductForm';
import { createProduct } from '../service/productService';

export default function NewProductPage() {
  const router = useRouter();
  const [pageError, setPageError] = useState('');

  const initialData: ProductData = {
    codigo_produto: '',
    descricao_produto: '',
    status: true,
    foto_produto: '',
  };

  const handleSubmit = async (data: ProductData, file: File | null) => {
    try {
      await createProduct(data, file);
      router.push('/product');
    } catch (err) {
      if (err instanceof Error) {
        setPageError(err.message);
      } else {
        setPageError('Erro ao criar produto');
      }
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Novo Produto</h1>
      {pageError && <div className="bg-red-50 text-red-500 p-4 rounded mb-4">{pageError}</div>}
      <ProductForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import ProductForm, { ProductData } from '../../components/products/ProductForm';
import { createProduct } from '../service/productService';

export default function NewProductPage() {
  const router = useRouter();

  const initialData: ProductData = {
    codigo_produto: '',
    descricao_produto: '',
    status: true,
    foto_produto: '',
  };

  const handleSubmit = async (data: ProductData, file: File | null) => {
    await createProduct(data, file);
    router.push('/product');
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Novo Produto</h1>
      <ProductForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
}

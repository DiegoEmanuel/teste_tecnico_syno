'use client';

import { useEffect, useState, use } from 'react';
import { fetchWithAuth } from '@/app/utils/api';
import { Product } from '@/app/types/product';
import { useRouter } from 'next/navigation';
import { ProductForm } from '@/app/components/products/ProductForm';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await fetchWithAuth(`/products/${resolvedParams.id}`);
        setProduct(data);
      } catch (error) {
        console.error('Erro ao carregar produto:', error);
        router.push('/product');
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [resolvedParams.id, router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  if (!product) {
    return null;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <ProductForm initialData={product} productId={resolvedParams.id} />
    </div>
  );
}

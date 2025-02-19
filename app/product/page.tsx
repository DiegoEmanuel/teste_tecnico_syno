'use client';

import { useEffect, useState, useCallback } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Product } from '@/app/types/product';
import { fetchWithAuth } from '@/app/lib/utils/api';
import Link from 'next/link';
import ProductCard from '../components/products/ProductCard';

export default function ProductPage() {
  const { status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  const handleLogout = useCallback(async () => {
    await signOut({ redirect: false });
    router.push('/');
  }, [router]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }

    if (status === 'authenticated') {
      fetchWithAuth('/products')
        .then(data => setProducts(data))
        .catch(error => {
          console.error('Erro ao buscar produtos:', error);
          handleLogout();
        });
    }
  }, [status, router, handleLogout]);

  if (status === 'loading') {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  return (
    <div className="p-8 pb-20 gap-16 sm:p-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Produtos</h1>
          <Link href="/product/new">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
              Criar Produto
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

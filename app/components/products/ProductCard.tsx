'use client';

import Link from 'next/link';
import { Product } from '@/app/types/product';

import { PencilIcon, PhotoIcon } from '@heroicons/react/24/outline';


type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div 
      className={`border rounded-lg p-4 flex flex-col gap-3 transition-all duration-300
        ${product.status 
          ? 'border-green-500 shadow-lg scale-105 bg-white z-10' 
          : 'border-gray-200 opacity-75 bg-gray-50'
        }`}
    >
      <div className="relative">
        {product.foto_produto ? (
          <img 
            src={product.foto_produto} 
            alt={product.descricao_produto}
            className={`w-full h-48 object-cover rounded-md 
              ${!product.status && 'grayscale'}`}
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center">
            <PhotoIcon className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <Link 
          href={`/product/${product.id}`}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
        >
          <PencilIcon className="w-5 h-5 text-gray-600" />
        </Link>
      </div>

      <Link href={`/product/${product.id}`}>
        <h2 className="font-semibold hover:text-green-500">{product.descricao_produto}</h2>
      </Link>
      <p className="text-sm text-gray-600">Código: {product.codigo_produto}</p>
      
      <div className="flex items-center gap-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium 
          ${product.status ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}
        >
          {product.status ? 'Ativo' : 'Inativo'}
        </span>
      </div>
    </div>
  );
}

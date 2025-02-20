import { ProductData } from '@/app/components/products/ProductForm';
import React from 'react';


export function useProductForm(initialState: ProductData) {
  const [formData, setFormData] = React.useState<ProductData>(initialState);
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');


  return { formData, setFormData, file, setFile, loading, setLoading, error, setError };
}

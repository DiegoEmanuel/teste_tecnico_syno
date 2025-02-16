import { fetchWithAuth } from '@/app/utils/api';

export async function createProduct(formData: FormData) {
    const response = await fetchWithAuth('/products', {
        method: 'POST',
        body: formData,
        'Content-Type': 'multipart/form-data',
    });
    return response;
}

export async function updateProduct(productId: string, formData: FormData) {

    const response = await fetchWithAuth(`/products/${productId}`, {
        method: 'PUT',
        body: formData,
        'Content-Type': 'multipart/form-data',
    });
    return response;
}

export async function deleteProduct(productId: string) {
    const response = await fetchWithAuth(`/products/${productId}`, {
        method: 'DELETE',
    });
    return response;
}

export async function getProduct(productId: string) {
    const response = await fetchWithAuth(`/products/${productId}`);
    return response;
}




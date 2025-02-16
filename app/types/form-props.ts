interface ProductFormProps {
    initialData?: {
        status: boolean;
        codigo_produto?: string;
        descricao_produto?: string;
        foto_produto?: string;
    };
    onSubmit: (formData: FormData) => Promise<void>;
    submitButtonText: string;
    loadingText: string;
}
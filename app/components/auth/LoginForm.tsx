'use client'

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  async function onSubmit(data: LoginFormData) {
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: '/product'
      });

      console.log('Resultado do login:', result); // Para debug

      if (result?.error) {
        setError('Email ou senha inválidos');
        return;
      }

      if (result?.ok) {
        router.push('/product');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Ocorreu um erro ao fazer login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md text-sm">
          {error}
        </div>
      )}

      <Input
        label="Email"
        icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
        {...register('email', {
          required: 'Email é obrigatório',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Email inválido'
          }
        })}
        type="email"
        error={errors.email}
        placeholder="seu@email.com"
      />

      <Input
        label="Senha"
        icon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
        {...register('password', { required: 'Senha é obrigatória' })}
        type="password"
        error={errors.password}
        placeholder="Sua senha"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors disabled:bg-green-300"
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
      <div className="flex flex-col items-center gap-4">
        <p className="text-gray-600">
          Ainda não tem uma conta?
        </p>
        <Link
          href="/register"
          className="text-blue-500 hover:text-blue-600 font-medium"
        >
          Cadastre-se
        </Link>
      </div>
    </form>
  );
}

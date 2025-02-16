'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <header className="w-full px-6 py-4 flex items-center justify-between border-b bg-green-500" >
      <Link href="/product">
        <h1 className="text-xl font-semibold text-white">
          SYNO | HEINEKEN
        </h1>
      </Link>
      {status === 'authenticated' && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {session.user.email}
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Sair
          </button>
        </div>
      )}
    </header>
  );
} 
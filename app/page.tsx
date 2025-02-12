
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a>
            Diego Emanuel Syno Test
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a>
          <p>
          {/* Criado com s2 por Diego Emanuel */}
          <a href="https://www.telacode.com.br/">
            Criado com s2 por Diego Emanuel
          </a>
          </p>
        </a>
      </footer>
    </div>
  );
}

// pra instalar eslint: ESLint
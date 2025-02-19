import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://34.205.99.179:3000/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao buscar produtos' },
      { status: 500 }
    );
  }
} 
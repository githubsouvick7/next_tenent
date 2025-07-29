'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function TenantContent() {
  const searchParams = useSearchParams();
  const tenant = searchParams.get('tenant');

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Welcome, {tenant}!</h1>
      <p>This is your personalized dashboard on {tenant}.example.com</p>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TenantContent />
    </Suspense>
  );
}

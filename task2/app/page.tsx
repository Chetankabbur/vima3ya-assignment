import { Suspense } from 'react';
import ModelViewer from '@/components/model-viewer';

export default function Home() {
  return (
    <main className="w-full h-screen bg-gray-950">
      <Suspense fallback={<div className="w-full h-screen bg-black flex items-center justify-center"><p className="text-white">Loading...</p></div>}>
        <ModelViewer />
      </Suspense>
    </main>
  );
}

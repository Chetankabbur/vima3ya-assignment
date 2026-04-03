'use client';

export const ShimmerLoader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 animate-pulse"></div>
          <div className="absolute inset-1 rounded-full bg-white"></div>
        </div>
        <p className="text-slate-600 font-medium">Submitting your form...</p>
      </div>
    </div>
  );
};

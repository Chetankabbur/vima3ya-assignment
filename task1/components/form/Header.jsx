'use client';

export const Header = () => {
    return (
        <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
            <div className="flex items-center justify-between px-8 py-4 max-w-full">
                {/* Logo and Company Name */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">FormFlow</h1>
                        <p className="text-xs text-slate-500">Professional Forms</p>
                    </div>
                </div>

                {/* Header Actions */}
                <div className="flex items-center gap-4">
                    <p className="text-sm text-slate-600 font-medium">Multi-Section Form</p>
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600">U</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

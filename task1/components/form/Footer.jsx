'use client';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-200 border-t border-slate-800 mt-16">
            <div className="max-w-7xl mx-auto px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-white"
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
                                <p className="font-bold text-white">FormFlow</p>
                                <p className="text-xs text-slate-400">Professional Forms</p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-400">
                            Streamlined form management for modern applications.
                        </p>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Product</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-sm hover:text-blue-400 transition-colors">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-blue-400 transition-colors">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-blue-400 transition-colors">
                                    Documentation
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-sm hover:text-blue-400 transition-colors">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-blue-400 transition-colors">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-blue-400 transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-sm hover:text-blue-400 transition-colors">
                                    Privacy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-blue-400 transition-colors">
                                    Terms
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-blue-400 transition-colors">
                                    Security
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-slate-400">
                            © {currentYear} FormFlow. All rights reserved.
                        </p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.29 20v-7.21H5.5V9.25h2.79V7.07c0-2.77 1.69-4.28 4.16-4.28 1.18 0 2.2.09 2.5.13v2.9h-1.72c-1.35 0-1.61.64-1.61 1.58v2.07h3.21l-4.42 3.54V20" />
                                </svg>
                            </a>
                            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                                </svg>
                            </a>
                            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

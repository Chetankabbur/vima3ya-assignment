'use client';

import { useEffect, useState } from 'react';

export function Sidebar() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [activeSectionId, setActiveSectionId] = useState<string>('section-a');

  useEffect(() => {
    const sections = ['section-a', 'section-b', 'section-c', 'section-d'];

    const observer = new IntersectionObserver(
      (entries) => {
        let highestIntersectingSection = activeSectionId;
        let highestRatio = 0;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));

            // Track which section is most in view
            if (entry.intersectionRatio > highestRatio) {
              highestRatio = entry.intersectionRatio;
              highestIntersectingSection = entry.target.id;
            }
          }
        });

        // Set the active section as the most visible one
        if (highestRatio > 0) {
          setActiveSectionId(highestIntersectingSection);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [activeSectionId]);

  const sectionLetters = ['A', 'B', 'C', 'D'];
  const sectionIds = ['section-a', 'section-b', 'section-c', 'section-d'];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSectionId(sectionId);
    }
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white p-8 h-fit">
      <div className="mb-12 pt-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">FormFlow</h2>
        <p className="text-xs text-slate-400 mt-2">Step through your information</p>
      </div>

      <nav className="flex-1 space-y-3 overflow-y-auto">
        {sectionLetters.map((letter, index) => {
          const sectionId = sectionIds[index];
          const isActive = activeSectionId === sectionId;
          const isVisited = visibleSections.has(sectionId);

          return (
            <button
              key={letter}
              onClick={() => scrollToSection(sectionId)}
              className={`w-full group relative transition-all duration-300 ${isActive ? 'translate-x-2' : ''
                }`}
            >
              {/* Background highlight for active state */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-full rounded-lg bg-blue-500 opacity-20 -z-10"></div>
              )}

              <div className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${isActive
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                : isVisited
                  ? 'text-slate-200 hover:bg-slate-700/50'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/30'
                }`}
              >
                {/* Circular number indicator */}
                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm transition-all ${isActive
                  ? 'bg-white text-slate-900 shadow-lg'
                  : isVisited
                    ? 'bg-slate-600 text-white'
                    : 'bg-slate-700 text-slate-400 group-hover:bg-slate-600'
                  }`}
                >
                  {letter}
                </div>

                {/* Section label */}
                <div className="flex-1 text-left">
                  <div className={`text-sm font-semibold ${isActive ? 'text-white' : ''}`}>
                    Section {letter}
                  </div>
                  <div className={`text-xs ${isActive ? 'text-blue-100' : 'text-slate-500'
                    }`}
                  >
                    {isVisited ? 'Completed' : 'Pending'}
                  </div>
                </div>

                {/* Checkmark for visited sections */}
                {isVisited && !isActive && (
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}

                {/* Active indicator */}
                {isActive && (
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                )}
              </div>
            </button>
          );
        })}
      </nav>

      <div className="mt-8 pt-8 border-t border-slate-700">
        <div className="text-xs text-slate-500 space-y-2">
          <p className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
            <span>Active section</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-400"></span>
            <span>Completed section</span>
          </p>
        </div>
      </div>
    </aside>
  );
}

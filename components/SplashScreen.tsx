import React, { useState, useEffect } from 'react';
import { ArrowRight, Search } from 'lucide-react';

interface DiscoveryChapter {
  number: string;
  question: string;
  title: string;
  href: string;
  excavation: string;
  status: 'active' | 'in-progress' | 'coming-soon';
}

const DISCOVERY_CHAPTERS: DiscoveryChapter[] = [
  {
    number: '01',
    question: 'Who are they?',
    title: 'We discovered who they are',
    href: '/segmentation',
    excavation: '1800+ AI simulations → 5 family segments',
    status: 'active',
  },
  {
    number: '02',
    question: 'What do they want?',
    title: 'We discovered what they want',
    href: '/research',
    excavation: '300+ pages • 120 sources • 4 reports',
    status: 'active',
  },
  {
    number: '03',
    question: 'Where do we come from?',
    title: 'We discovered where we come from',
    href: '#',
    excavation: 'Heritage & legacy excavation',
    status: 'coming-soon',
  },
  {
    number: '04',
    question: 'Who are we?',
    title: 'We discovered who we are',
    href: '#',
    excavation: 'Brand identity crystallization',
    status: 'coming-soon',
  },
  {
    number: '05',
    question: 'How might we reach them?',
    title: 'We discovered how to reach them',
    href: '#prototypes',
    excavation: '3 prototypes • 15+ iterations',
    status: 'active',
  },
  {
    number: '06',
    question: 'What do we need?',
    title: 'We discovered what we need',
    href: '#assets',
    excavation: 'Asset toolkit assembly',
    status: 'coming-soon',
  },
];

const PROTOTYPES = [
  { name: 'Classic', href: 'https://classic-eta.vercel.app', description: 'Georgia serif' },
  { name: 'Swiss', href: 'https://swiss-chi.vercel.app', description: 'Helvetica' },
  { name: 'Bounce', href: 'https://bounce-sand-gamma.vercel.app', description: 'Rounded Sans' },
];

export const SplashScreen: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [expandPrototypes, setExpandPrototypes] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalExcavation = {
    simulations: '1800+',
    pages: '300+',
    sources: 120,
    iterations: '15+',
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute inset-0 opacity-10 transition-opacity duration-2000 ${mounted ? 'opacity-10' : 'opacity-0'}`}
          style={{
            background: `
              radial-gradient(circle at 20% 80%, #2D8F6F 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, #3B7DD8 0%, transparent 50%)
            `,
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className={`p-8 md:p-12 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="flex items-center gap-3">
            <Search className="w-4 h-4 text-[#2D8F6F]" />
            <div>
              <h1 className="font-mono text-sm uppercase tracking-widest">Saint Stephen's Episcopal School</h1>
              <p className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-wider">A Strategic Rebranding</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col justify-center px-8 md:px-12 lg:px-24">
          <div className={`max-w-3xl transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Hero Question */}
            <div className="mb-16">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal mb-6 tracking-tight leading-tight">
                "Where will <span className="text-[#2D8F6F] italic">growth</span> come from?"
              </h2>
              <p className="font-mono text-base text-[#8a8a8a] max-w-xl">
                We didn't assume. We excavated.
              </p>
            </div>

            {/* We Discovered... */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-[#2D8F6F]" />
                <span className="font-mono text-xs text-[#2D8F6F] uppercase tracking-widest">We discovered...</span>
              </div>
            </div>

            {/* Discovery Chapters */}
            <div className="space-y-0">
              {DISCOVERY_CHAPTERS.map((chapter, index) => {
                const isClickable = chapter.status === 'active';
                const isPrototypes = chapter.number === '05' && chapter.href === '#prototypes';
                
                const content = (
                  <>
                    <div className="flex items-start justify-between py-5 border-b border-[#2a2a2a] group-hover:border-[#4a4a4a] transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-1">
                          <span className="font-mono text-[10px] text-[#4a4a4a]">{chapter.number}</span>
                          <h3 className="font-serif text-xl md:text-2xl text-white group-hover:text-[#2D8F6F] transition-colors">
                            {chapter.title}
                          </h3>
                        </div>
                        <p className="font-mono text-[11px] text-[#6a6a6a] ml-10">
                          {chapter.excavation}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {chapter.status === 'coming-soon' ? (
                          <span className="font-mono text-[9px] text-[#4a4a4a] uppercase tracking-wider px-2 py-1 border border-[#2a2a2a]">
                            Coming
                          </span>
                        ) : (
                          <ArrowRight
                            className={`w-4 h-4 transition-all duration-300 ${hoveredItem === index ? 'translate-x-1 text-[#2D8F6F]' : 'text-[#4a4a4a]'}`}
                          />
                        )}
                      </div>
                    </div>
                  </>
                );

                if (!isClickable && !isPrototypes) {
                  return (
                    <div
                      key={chapter.number}
                      className="group cursor-default opacity-50"
                    >
                      {content}
                    </div>
                  );
                }

                if (isPrototypes) {
                  return (
                    <div
                      key={chapter.number}
                      className="group cursor-pointer"
                      onClick={() => setExpandPrototypes(!expandPrototypes)}
                      onMouseEnter={() => setHoveredItem(index)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      {content}
                      
                      {/* Prototypes expansion */}
                      <div className={`overflow-hidden transition-all duration-500 ${expandPrototypes ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="grid grid-cols-3 gap-3 py-4 ml-10">
                          {PROTOTYPES.map((proto) => (
                            <a
                              key={proto.name}
                              href={proto.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-4 border border-[#2a2a2a] hover:border-white transition-all group/proto"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-mono text-sm font-bold uppercase">{proto.name}</span>
                                <ArrowRight className="w-3 h-3 text-[#4a4a4a] group-hover/proto:text-white transition-colors" />
                              </div>
                              <p className="font-mono text-[10px] text-[#6a6a6a]">{proto.description}</p>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <a
                    key={chapter.number}
                    href={chapter.href}
                    className="group block"
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {content}
                  </a>
                );
              })}
            </div>
          </div>
        </main>

        {/* Excavation Footer */}
        <footer className={`border-t border-[#1a1a1a] transition-all duration-1000 delay-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="px-8 md:px-12 lg:px-24 py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-6">
                <span className="font-mono text-[10px] text-[#4a4a4a] uppercase tracking-wider">Excavation</span>
                <div className="flex items-center gap-4 font-mono text-[10px] text-[#6a6a6a]">
                  <span>{totalExcavation.simulations} simulations</span>
                  <span className="text-[#2a2a2a]">|</span>
                  <span>{totalExcavation.pages} pages</span>
                  <span className="text-[#2a2a2a]">|</span>
                  <span>{totalExcavation.sources} sources</span>
                  <span className="text-[#2a2a2a]">|</span>
                  <span>{totalExcavation.iterations} iterations</span>
                </div>
              </div>
              <div className="font-mono text-[10px] text-[#4a4a4a]">
                © 2026 Fosfeen — Bradenton, FL
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SplashScreen;

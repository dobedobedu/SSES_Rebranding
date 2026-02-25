import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Search } from 'lucide-react';

interface DiscoveryChapter {
  number: string;
  title: string;
  href: string;
  excavation: string;
  heroText: string;
  status: 'active' | 'in-progress' | 'coming-soon';
}

const DISCOVERY_CHAPTERS: DiscoveryChapter[] = [
  {
    number: '01',
    title: 'Who are they?',
    href: '/segmentation',
    excavation: '1800+ AI simulations → 5 family segments',
    heroText: '1800+ AI simulations, 5 family segments, 300+ pages of research',
    status: 'active',
  },
  {
    number: '02',
    title: 'What do they want?',
    href: '/research',
    excavation: '300+ pages • 120 sources • 4 reports',
    heroText: '4 research reports, 120 trusted sources, 40+ hours invested',
    status: 'active',
  },
  {
    number: '03',
    title: 'Where do we come from?',
    href: '#',
    excavation: 'Heritage & legacy',
    heroText: '14 historical artifacts, 5 decades of legacy',
    status: 'coming-soon',
  },
  {
    number: '04',
    title: 'Who are we?',
    href: '#',
    excavation: 'Brand identity',
    heroText: '3 brand directions, 12 iterations explored',
    status: 'coming-soon',
  },
  {
    number: '05',
    title: 'How might we reach them?',
    href: '#prototypes',
    excavation: '3 prototypes • 15+ iterations',
    heroText: '3 live prototypes, 15+ design iterations',
    status: 'active',
  },
  {
    number: '06',
    title: 'What do we need?',
    href: '#assets',
    excavation: 'Asset toolkit',
    heroText: 'Photos, videos, logos, guidelines, templates',
    status: 'coming-soon',
  },
];

const PROTOTYPES = [
  { name: 'Classic', href: 'https://classic-eta.vercel.app', description: 'Georgia serif' },
  { name: 'Swiss', href: 'https://swiss-chi.vercel.app', description: 'Helvetica' },
  { name: 'Bounce', href: 'https://bounce-sand-gamma.vercel.app', description: 'Rounded Sans' },
];

const DEFAULT_HERO = 'How might we meet the next generation of Falcons where they are?';

// Fast scramble effect
const ScrambleText: React.FC<{ text: string; speed?: number }> = ({ text, speed = 20 }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789•→';
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setDisplayText(text);
    
    // Clear any existing animation
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
    }

    let iteration = 0;
    const maxIterations = text.length;
    
    timeoutRef.current = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === ',' || char === '+' || char === '?') return char;
            if (iteration > index * 0.8) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration++;
      
      if (iteration >= maxIterations * 1.5) {
        if (timeoutRef.current) clearInterval(timeoutRef.current);
        setDisplayText(text);
      }
    }, speed);

    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [text, speed]);

  return <>{displayText}</>;
};

export const SplashScreen: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [expandPrototypes, setExpandPrototypes] = useState(false);
  const [heroText, setHeroText] = useState(DEFAULT_HERO);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update hero text when hovering chapters
  useEffect(() => {
    if (hoveredItem !== null && DISCOVERY_CHAPTERS[hoveredItem]) {
      setHeroText(DISCOVERY_CHAPTERS[hoveredItem].heroText);
    } else {
      setHeroText(DEFAULT_HERO);
    }
  }, [hoveredItem]);

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
            
            {/* Hero Question with scramble effect */}
            <div className="mb-8">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal mb-4 tracking-tight leading-tight">
                "<ScrambleText text={heroText} speed={15} />"
              </h2>
              <p className="font-mono text-sm text-[#8a8a8a] max-w-xl">
                In 6 months, we excavated the answers.
              </p>
            </div>

            {/* Divider */}
            <div className="mb-8">
              <div className="w-full h-[1px] bg-[#2a2a2a]" />
            </div>

            {/* Discovery Chapters */}
            <div className="space-y-0">
              {DISCOVERY_CHAPTERS.map((chapter, index) => {
                const isClickable = chapter.status === 'active';
                const isPrototypes = chapter.number === '05' && chapter.href === '#prototypes';
                
                const content = (
                  <>
                    <div className="flex items-start justify-between py-4 border-b border-[#1a1a1a] group-hover:border-[#2a2a2a] transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-1">
                          <span className="font-mono text-[10px] text-[#4a4a4a] w-6">{chapter.number}</span>
                          <h3 className="font-serif text-lg md:text-xl text-white group-hover:text-[#2D8F6F] transition-colors">
                            {chapter.title}
                          </h3>
                        </div>
                        <p className="font-mono text-[11px] text-[#5a5a5a] ml-10">
                          {chapter.excavation}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {chapter.status === 'coming-soon' ? (
                          <span className="font-mono text-[9px] text-[#3a3a3a] uppercase tracking-wider">
                            soon
                          </span>
                        ) : (
                          <ArrowRight
                            className={`w-4 h-4 transition-all duration-300 ${hoveredItem === index ? 'translate-x-1 text-[#2D8F6F]' : 'text-[#3a3a3a]'}`}
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
                      className="group cursor-default opacity-40"
                      onMouseEnter={() => setHoveredItem(index)}
                      onMouseLeave={() => setHoveredItem(null)}
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
                              className="p-3 border border-[#2a2a2a] hover:border-white transition-all group/proto"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-mono text-xs font-bold uppercase">{proto.name}</span>
                                <ArrowRight className="w-3 h-3 text-[#4a4a4a] group-hover/proto:text-white transition-colors" />
                              </div>
                              <p className="font-mono text-[9px] text-[#5a5a5a]">{proto.description}</p>
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
          <div className="px-8 md:px-12 lg:px-24 py-5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div className="flex items-center gap-5">
                <span className="font-mono text-[9px] text-[#3a3a3a] uppercase tracking-wider">6 months</span>
                <div className="flex items-center gap-3 font-mono text-[10px] text-[#5a5a5a]">
                  <span>{totalExcavation.simulations} simulations</span>
                  <span className="text-[#2a2a2a]">·</span>
                  <span>{totalExcavation.pages} pages</span>
                  <span className="text-[#2a2a2a]">·</span>
                  <span>{totalExcavation.sources} sources</span>
                  <span className="text-[#2a2a2a]">·</span>
                  <span>{totalExcavation.iterations} iterations</span>
                </div>
              </div>
              <div className="font-mono text-[9px] text-[#3a3a3a]">
                Fosfeen · Bradenton, FL · 2026
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SplashScreen;

import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  description: string;
  comingSoon?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Segmentation', href: '/segmentation', description: 'Based on 1800+ AI simulations' },
  { label: 'Research', href: '/research', description: '300+ pages, 120 trusted sources' },
  { label: 'Heritage', href: '#', description: '14 historical artifacts', comingSoon: true },
  { label: 'Brand ID', href: '#', description: 'Visual Identity', comingSoon: true },
];

export const SplashScreen: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<'prototypes' | 'assets' | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className={`absolute inset-0 opacity-20 transition-opacity duration-2000 ${mounted ? 'opacity-20' : 'opacity-0'}`}
          style={{
            background: `
              radial-gradient(circle at 20% 80%, #2D8F6F 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, #3B7DD8 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, #4AA89D 0%, transparent 40%),
              radial-gradient(circle at 60% 60%, #2D8F6F 0%, transparent 40%)
            `
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Logo / Brand */}
        <header className={`p-8 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div>
            <h1 className="font-mono text-sm uppercase tracking-widest">Saint Stephen's</h1>
            <p className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-wider">Episcopal School</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col justify-center items-center px-8">
          <div className={`max-w-4xl w-full transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Main Title */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#4a4a4a] rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-[#2D8F6F]" />
                <span className="font-mono text-xs text-[#8a8a8a] uppercase tracking-wider">
                  Strategic Growth Initiative
                </span>
              </div>
              <h2 className="font-mono text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                Where Will<br />
                <span className="text-[#2D8F6F]">Growth</span> Come From?
              </h2>
              <p className="font-mono text-lg text-[#8a8a8a] max-w-2xl mx-auto">
                Strategic segmentation based on 1800+ AI simulations,
                <br />
                powered by 300+ pages of research and 120 trusted sources.
              </p>
            </div>

            {/* Navigation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {NAV_ITEMS.map((item, index) => {
                const content = (
                  <>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-mono text-[10px] text-[#2D8F6F]">
                            0{index + 1}
                          </span>
                          <h3 className="font-mono text-lg font-bold uppercase tracking-wider">
                            {item.label}
                          </h3>
                        </div>
                        <p className="font-mono text-xs text-[#8a8a8a]">
                          {item.description}
                        </p>
                      </div>
                      {item.comingSoon ? (
                        <span className="font-mono text-[10px] text-[#8a8a8a] uppercase">
                          Coming Soon
                        </span>
                      ) : (
                        <ArrowRight 
                          className={`
                            w-5 h-5 transition-all duration-300
                            ${hoveredItem === index ? 'translate-x-2 text-[#2D8F6F]' : 'text-[#4a4a4a]'}
                          `} 
                        />
                      )}
                    </div>
                    
                    {/* Hover glow effect */}
                    <div 
                      className={`
                        absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none
                        ${hoveredItem === index ? 'opacity-100' : ''}
                      `}
                      style={{
                        background: `linear-gradient(135deg, ${index === 0 ? '#2D8F6F' : index === 1 ? '#3B7DD8' : index === 2 ? '#4AA89D' : '#2D8F6F'}10 0%, transparent 100%)`
                      }}
                    />
                  </>
                );

                const className = `
                  group relative p-6 border-2 transition-all duration-300 cursor-pointer block
                  ${hoveredItem === index 
                    ? 'border-white bg-white/5 translate-x-2' 
                    : 'border-[#4a4a4a] hover:border-white'
                  }
                  ${item.comingSoon ? 'opacity-60 hover:opacity-100' : ''}
                `;

                if (item.comingSoon) {
                  return (
                    <div
                      key={item.label}
                      onClick={() => alert('Coming Soon')}
                      onMouseEnter={() => setHoveredItem(index)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={className}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      {content}
                    </div>
                  );
                }

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={className}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {content}
                  </a>
                );
              })}
            </div>

            {/* Prototypes & Assets Section */}
            <div className="mt-12 space-y-4">
              {/* Prototypes Button */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveSection('prototypes')}
                onMouseLeave={() => setActiveSection(null)}
              >
                <div className={`
                  p-6 border-2 transition-all duration-300 cursor-pointer
                  ${activeSection === 'prototypes' 
                    ? 'border-white bg-white/5' 
                    : 'border-[#4a4a4a] hover:border-white'
                  }
                `}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-[#2D8F6F]">05</span>
                      <h3 className="font-mono text-lg font-bold uppercase tracking-wider">Prototypes</h3>
                      <span className="font-mono text-xs text-[#8a8a8a] ml-4">Explore brand directions</span>
                    </div>
                    <ArrowRight className={`w-5 h-5 transition-all duration-300 ${activeSection === 'prototypes' ? 'translate-x-2 text-[#2D8F6F]' : 'text-[#4a4a4a]'}`} />
                  </div>
                </div>
                
                {/* Prototypes Sub-buttons */}
                <div className={`
                  grid grid-cols-3 gap-2 mt-2 overflow-hidden transition-all duration-300
                  ${activeSection === 'prototypes' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
                `}>
                  <a
                    href="https://classic-eta.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 border-2 border-[#4a4a4a] hover:border-white hover:bg-[#bcd1ca] transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold uppercase">Classic</span>
                      <ArrowRight className="w-4 h-4 text-[#4a4a4a] group-hover:text-[#2D8F6F] group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="font-mono text-[10px] text-[#8a8a8a] mt-1">Georgia serif</p>
                  </a>
                  <a
                    href="https://swiss-chi.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 border-2 border-[#4a4a4a] hover:border-white hover:bg-[#cbcadb] transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold uppercase">Swiss</span>
                      <ArrowRight className="w-4 h-4 text-[#4a4a4a] group-hover:text-[#3B7DD8] group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="font-mono text-[10px] text-[#8a8a8a] mt-1">Helvetica</p>
                  </a>
                  <a
                    href="https://bounce-sand-gamma.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 border-2 border-[#4a4a4a] hover:border-white hover:bg-[#e2dacb] transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold uppercase">Bounce</span>
                      <ArrowRight className="w-4 h-4 text-[#4a4a4a] group-hover:text-[#4AA89D] group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="font-mono text-[10px] text-[#8a8a8a] mt-1">Rounded Sans</p>
                  </a>
                </div>
              </div>

              {/* Assets Button */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveSection('assets')}
                onMouseLeave={() => setActiveSection(null)}
              >
                <div className={`
                  p-6 border-2 transition-all duration-300 cursor-pointer
                  ${activeSection === 'assets' 
                    ? 'border-white bg-white/5' 
                    : 'border-[#4a4a4a] hover:border-white'
                  }
                `}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-[#2D8F6F]">06</span>
                      <h3 className="font-mono text-lg font-bold uppercase tracking-wider">Assets</h3>
                      <span className="font-mono text-xs text-[#8a8a8a] ml-4">Brand system components</span>
                    </div>
                    <ArrowRight className={`w-5 h-5 transition-all duration-300 ${activeSection === 'assets' ? 'translate-x-2 text-[#2D8F6F]' : 'text-[#4a4a4a]'}`} />
                  </div>
                </div>
                
                {/* Assets Sub-buttons */}
                <div className={`
                  grid grid-cols-5 gap-2 mt-2 overflow-hidden transition-all duration-300
                  ${activeSection === 'assets' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
                `}>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); alert('Coming Soon'); }}
                    className="p-4 border-2 border-[#4a4a4a] hover:border-white hover:bg-white/5 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold uppercase">Video</span>
                      <ArrowRight className="w-4 h-4 text-[#4a4a4a] group-hover:text-[#2D8F6F] group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="font-mono text-[10px] text-[#8a8a8a] mt-1">Motion assets</p>
                  </a>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); alert('Coming Soon'); }}
                    className="p-4 border-2 border-[#4a4a4a] hover:border-white hover:bg-white/5 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold uppercase">Photo</span>
                      <ArrowRight className="w-4 h-4 text-[#4a4a4a] group-hover:text-[#2D8F6F] group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="font-mono text-[10px] text-[#8a8a8a] mt-1">Image library</p>
                  </a>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); alert('Coming Soon'); }}
                    className="p-4 border-2 border-[#4a4a4a] hover:border-white hover:bg-white/5 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold uppercase">Logo</span>
                      <ArrowRight className="w-4 h-4 text-[#4a4a4a] group-hover:text-[#2D8F6F] group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="font-mono text-[10px] text-[#8a8a8a] mt-1">Marks & variants</p>
                  </a>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); alert('Coming Soon'); }}
                    className="p-4 border-2 border-[#4a4a4a] hover:border-white hover:bg-white/5 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold uppercase">Guidelines</span>
                      <ArrowRight className="w-4 h-4 text-[#4a4a4a] group-hover:text-[#2D8F6F] group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="font-mono text-[10px] text-[#8a8a8a] mt-1">Brand standards</p>
                  </a>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); alert('Coming Soon'); }}
                    className="p-4 border-2 border-[#4a4a4a] hover:border-white hover:bg-white/5 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold uppercase">Templates</span>
                      <ArrowRight className="w-4 h-4 text-[#4a4a4a] group-hover:text-[#2D8F6F] group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="font-mono text-[10px] text-[#8a8a8a] mt-1">Presentation kits</p>
                  </a>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-16 text-center">
              <p className="font-mono text-[10px] text-[#4a4a4a] uppercase tracking-widest">
                Select a section to explore
              </p>
            </div>
          </div>
        </main>

        {/* Bottom Bar */}
        <footer className={`p-6 border-t border-[#4a4a4a] transition-all duration-1000 delay-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex justify-between items-center">
            <div className="font-mono text-[10px] text-[#4a4a4a]">
              © 2026 Fosfeen
            </div>
            <div className="flex gap-4">
              <span className="font-mono text-[10px] text-[#4a4a4a]">Bradenton, FL</span>
              <span className="font-mono text-[10px] text-[#4a4a4a]">34209</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SplashScreen;

import React, { useState } from 'react';
import { ArrowLeft, Users, MapPin } from 'lucide-react';

const RESEARCH_TABS = [
  { id: 'local', label: 'Local Family', src: '/local-discover.html', icon: Users },
  { id: 'relocation', label: 'Relocation Family', src: '/relocation-radar.html', icon: MapPin },
];

const ResearchPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('relocation');

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header with back button */}
      <div className="border-b border-[#ffffff20]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#ffffff30] font-mono text-sm uppercase tracking-wider text-white hover:border-[#00cc66] hover:text-[#00cc66] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </a>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-[#ffffff20] bg-[#151515]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {RESEARCH_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-6 py-4 font-mono text-sm uppercase tracking-wider transition-all
                    border-b-2 min-w-[180px] justify-center
                    ${isActive
                      ? 'border-[#00cc66] text-[#00cc66] bg-[#1a1a1a]'
                      : 'border-transparent text-[#666666] hover:text-white hover:border-[#ffffff30]'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Research Content */}
      <div className="h-[calc(100vh-140px)]">
        {RESEARCH_TABS.map((tab) => (
          <iframe
            key={tab.id}
            src={tab.src}
            className={`w-full h-full ${activeTab === tab.id ? 'block' : 'hidden'}`}
            title={tab.label}
          />
        ))}
      </div>
    </div>
  );
};

export default ResearchPage;

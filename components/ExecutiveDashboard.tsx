import React, { useState } from 'react';
import { Printer, Download, Check, Users, Heart, Construction, ChevronDown, ChevronUp, Vote } from 'lucide-react';
import { PrioritySegmentType, ConfidenceLevel } from '../types';
import { ConfidenceBadge } from './MetricsVisualization';
import { VotingSection } from './VotingSection';
import { VotingResults } from './VotingResults';

interface ExecutiveDashboardProps {
  onSegmentClick?: (segment: PrioritySegmentType) => void;
  prioritySegments: string[];
  onTogglePriority?: (segmentId: string) => void;
}

const SEGMENTS = [
  { id: 'corp', label: 'CORPORATE RELOCATOR', color: '#4a4a4a', description: '700-800 families/year relocating' },
  { id: 'life', label: 'LIFESTYLE ENTREPRENEUR', color: '#00cc66', description: '500-750 content creators' },
  { id: 'pivot', label: 'IMG SWITCHER', color: '#2D8F6F', description: '195-260 annual transfers' },
  { id: 'bridge', label: 'BRIDGE CROSSER', color: '#0066ff', description: '680-850 K-8 graduates' },
  { id: 'teen', label: 'TEEN ADVOCATE', color: '#9933ff', description: 'Student influence' }
];

const KPI_DATA = [
  { 
    label: 'TOTAL RELOCATING FAMILIES', 
    value: '1,080-1,670', 
    unit: 'families/yr', 
    color: 'green', 
    confidence: 'medium' as ConfidenceLevel, 
    source: 'Aggregated from Tier 1 hiring intelligence, Feb 2026',
    icon: 'Users',
    breakdown: [
      { name: 'PGT Innovations', value: '300-500', sector: 'Manufacturing', distance: '8 miles' },
      { name: 'Sarasota Memorial Health', value: '400-600', sector: 'Healthcare', distance: '12 miles' },
      { name: 'Lakewood Ranch Medical', value: '100-150', sector: 'Healthcare', distance: '15 miles' },
      { name: 'Benderson Development', value: '80-120', sector: 'Real Estate', distance: '10 miles' },
      { name: 'Catalent', value: '200-300', sector: 'Pharmaceuticals', distance: '25 miles' },
      { name: 'Tier 2 Companies', value: '150-250', sector: 'Mixed', distance: 'Various' }
    ]
  },
  { 
    label: 'HEALTHCARE HIRING', 
    value: '1,250+', 
    unit: 'openings', 
    color: 'blue', 
    confidence: 'high' as ConfidenceLevel, 
    source: 'Real-time job postings, Feb 2026',
    icon: 'Heart',
    breakdown: [
      { name: 'Sarasota Memorial Health', value: '1,000+', detail: 'Largest healthcare system', status: '●●●●● Massive hiring' },
      { name: 'Lakewood Ranch Medical', value: '150+', detail: 'Part of UHS network', status: '●●●● Active hiring' },
      { name: 'HCA Florida Sarasota', value: '113+', detail: 'Opening new Venice ED', status: '●●●● Active hiring' }
    ],
    insight: '#1 hiring sector by volume'
  },
  { 
    label: 'LOCAL SWITCHER TRANSFERS', 
    value: '195-260', 
    unit: 'students/yr', 
    color: 'green', 
    confidence: 'medium' as ConfidenceLevel, 
    source: 'Internal enrollment data & feeder school analysis',
    icon: 'Users',
    isSankey: true,
    sankeySrc: '/sankey_img_transfers.html',
    sankeySrc2: '/sankey_k8_transitions.html',
    breakdown: [
      { name: 'IMG Academy Transfers', value: '195-260', detail: 'Sports-focused boarding school', status: '●●●●● High priority' },
      { name: 'Local K-8 Transitions', value: '680-850', detail: 'K-8 graduates staying in area', status: '●●●● Bridge segment' }
    ]
  }
];

const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  onSegmentClick,
  prioritySegments,
  onTogglePriority
}) => {
  const [expandedKPI, setExpandedKPI] = useState<number | null>(null);

  const toggleKPI = (index: number) => {
    setExpandedKPI(expandedKPI === index ? null : index);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users className="w-4 h-4" />;
      case 'Heart': return <Heart className="w-4 h-4" />;
      case 'Construction': return <Construction className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };
  const handlePrint = () => {
    window.print();
  };

const handleExport = () => {
    const exportData = `
SSES Strategic Growth Matrix - Executive Summary
================================================
Generated: ${new Date().toLocaleDateString()}

PRIORITY SEGMENTS (User Selected)
---------------------------------
${SEGMENTS.filter(s => prioritySegments.includes(s.id)).map(s => `- ${s.label}: ${s.description}`).join('\n')}

KEY METRICS (Updated Feb 2026)
------------------------------
Total Relocating Families: 1,080-1,670 families/year (MEDIUM confidence)
  - PGT Innovations: 300-500
  - Sarasota Memorial Health: 400-600
  - Lakewood Ranch Medical: 100-150
  - Benderson Development: 80-120
  - Catalent: 200-300
  - Tier 2 Companies: 150-250

Healthcare Hiring: 1,250+ openings (HIGH confidence)
  - Sarasota Memorial Health: 1,000+
  - Lakewood Ranch Medical: 150+
  - HCA Florida Sarasota: 113+

Major Expansions: $597M investment (HIGH confidence)
  - North Port Hospital: $507M (500+ jobs by 2027)
  - Venice ER Expansion: $90M (61 exam rooms)

SOURCE CITATIONS
----------------
- Real-time hiring intelligence, Feb 2026
- Company careers pages
- Construction permits & press releases
- LinkedIn + Canon Research
`.trim();

    const blob = new Blob([exportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SSES-Growth-Matrix-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="no-print bg-[#f5f5f0] border-b-2 border-[#0a0a0a] min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-[#2D8F6F]" />
            <div>
              <h2 className="font-mono text-sm font-bold uppercase tracking-wider">EXECUTIVE SUMMARY</h2>
              <p className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest">Select priority segments below</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-2 bg-[#0a0a0a] text-white border-2 border-[#0a0a0a] font-mono text-[10px] uppercase tracking-wider hover:bg-white hover:text-[#0a0a0a] transition-all"
            >
              <Printer className="w-3 h-3" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-3 py-2 bg-[#2D8F6F] text-white border-2 border-[#2D8F6F] font-mono text-[10px] uppercase tracking-wider hover:bg-white hover:text-[#2D8F6F] hover:border-[#2D8F6F] transition-all"
            >
              <Download className="w-3 h-3" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

{/* KPI Cards Grid - 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {KPI_DATA.map((kpi, index) => (
          <div key={index} className="relative">
            <div
              className={`bg-[#fafafa] p-5 pl-6 border-2 border-[#0a0a0a] cursor-pointer transition-all hover:shadow-[4px_4px_0_#0a0a0a] ${expandedKPI === index ? 'shadow-[4px_4px_0_#0a0a0a]' : ''}`}
              onClick={() => toggleKPI(index)}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: kpi.color === 'amber' ? '#2D8F6F' : kpi.color === 'blue' ? '#0066ff' : kpi.color === 'green' ? '#00cc66' : '#0a0a0a' }} />
              
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span style={{ color: kpi.color === 'amber' ? '#2D8F6F' : kpi.color === 'blue' ? '#0066ff' : '#00cc66' }}>
                    {getIcon(kpi.icon || 'Users')}
                  </span>
                  <span className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest">
                    {kpi.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ConfidenceBadge confidence={kpi.confidence} />
                  {expandedKPI === index ? <ChevronUp className="w-4 h-4 text-[#8a8a8a]" /> : <ChevronDown className="w-4 h-4 text-[#8a8a8a]" />}
                </div>
              </div>
              
              <div className="flex items-baseline gap-2">
                <div className="font-mono text-3xl md:text-4xl font-bold tracking-tight" style={{ color: kpi.color === 'amber' ? '#2D8F6F' : kpi.color === 'blue' ? '#0066ff' : '#00cc66' }}>
                  {kpi.value}
                </div>
                <div className="font-mono text-[10px] text-[#4a4a4a] uppercase tracking-wide">
                  {kpi.unit}
                </div>
              </div>
              
              {kpi.insight && (
                <div className="mt-2 font-mono text-[10px] text-[#8a8a8a] italic">
                  {kpi.insight}
                </div>
              )}
            </div>
            
            {/* Expanded Content */}
            {expandedKPI === index && (kpi.breakdown || kpi.isSankey) && (
              <div className="mt-4 p-4 bg-[#f5f5f0] border-2 border-[#0a0a0a] border-t-0">
                {kpi.breakdown && (
                  <>
                    <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest mb-3 border-b border-[#0a0a0a] pb-2">
                      Calculation Breakdown
                    </div>
                    <div className="space-y-3">
                      {kpi.breakdown.map((item: any, i: number) => (
                        <div key={i} className="flex items-start justify-between text-sm">
                          <div className="flex-1">
                            <div className="font-bold text-[#0a0a0a]">{item.name}</div>
                            {item.sector && (
                              <div className="font-mono text-[9px] text-[#8a8a8a]">{item.sector} | {item.distance}</div>
                            )}
                            {item.detail && (
                              <div className="font-mono text-[9px] text-[#8a8a8a]">{item.detail}</div>
                            )}
                            {item.investment && (
                              <div className="font-mono text-[9px] text-[#8a8a8a]">{item.investment} • {item.jobs} • {item.timeline}</div>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="font-mono font-bold">{item.value || item.investment}</div>
                            {item.status && (
                              <div className="font-mono text-[9px] text-[#2D8F6F]">{item.status}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                <div className="mt-4 pt-3 border-t border-[#0a0a0a] font-mono text-[9px] text-[#8a8a8a]">
                  Source: {kpi.source}
                </div>
                {kpi.isSankey && (
                  <div className="mt-4 pt-3 border-t border-[#0a0a0a]">
                    <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest mb-3">
                      Student Flow Analysis
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <a 
                        href={kpi.sankeySrc} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block border-2 border-[#0a0a0a] p-4 bg-white hover:bg-[#f5f5f0] transition-colors"
                      >
                        <div className="font-mono text-[10px] font-bold uppercase mb-2">Local Switcher Transfers</div>
                        <div className="font-mono text-[9px] text-[#8a8a8a]">Click to view Sankey diagram</div>
                        <div className="mt-2 text-[#2D8F6F] font-mono text-xs">Open in new tab →</div>
                      </a>
                      <a 
                        href={kpi.sankeySrc2} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block border-2 border-[#0a0a0a] p-4 bg-white hover:bg-[#f5f5f0] transition-colors"
                      >
                        <div className="font-mono text-[10px] font-bold uppercase mb-2">K-8 Transitions</div>
                        <div className="font-mono text-[9px] text-[#8a8a8a]">Click to view Sankey diagram</div>
                        <div className="mt-2 text-[#2D8F6F] font-mono text-xs">Open in new tab →</div>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

        {/* Priority Segment Selector */}
        <div className="border-2 border-[#0a0a0a] bg-white">
          <div className="border-b border-[#0a0a0a] px-4 py-2 bg-[#0a0a0a]">
            <span className="font-mono text-[10px] text-white uppercase tracking-widest">
              Select Priority Segments (click to toggle)
            </span>
            <span className="font-mono text-[10px] text-[#8a8a8a] ml-4">
              {prioritySegments.length} selected
            </span>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              {SEGMENTS.map((segment) => {
                const isSelected = prioritySegments.includes(segment.id);
                return (
                  <button
                    key={segment.id}
                    onClick={() => onTogglePriority?.(segment.id)}
                    className={`
                      relative p-3 border-2 transition-all text-left
                      ${isSelected
                        ? 'border-[#0a0a0a] bg-white'
                        : 'border-[#e5e5e0] bg-[#f5f5f0] hover:border-[#0a0a0a]'
                      }
                    `}
                  >
                    {/* Selection indicator */}
                    <div
                      className={`
                        absolute top-2 right-2 w-5 h-5 border-2 flex items-center justify-center
                        ${isSelected ? 'bg-[#0a0a0a] border-[#0a0a0a]' : 'border-[#4a4a4a]'}
                      `}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>

                    {/* Color indicator */}
                    <div
                      className="w-8 h-2 mb-2"
                      style={{ backgroundColor: segment.color }}
                    />

                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider mb-1">
                      {segment.label}
                    </div>
                    <div className="font-mono text-[9px] text-[#8a8a8a]">
                      {segment.description}
                    </div>

                    {isSelected && (
                      <div className="absolute bottom-2 left-3 right-3">
                        <div
                          className="h-1"
                          style={{ backgroundColor: segment.color }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
</div>
      </div>
    </div>

    {/* Voting Section */}
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Vote className="w-4 h-4 text-[#2D8F6F]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider">
            Stakeholder Voting
          </span>
        </div>
        <VotingSection />
      </div>
      <div>
        <VotingResults />
      </div>
    </div>

    </div>
  </div>
);
};

export default ExecutiveDashboard;

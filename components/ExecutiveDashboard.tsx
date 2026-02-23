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
    value: '650-850', 
    unit: 'families/yr', 
    color: 'green', 
    confidence: 'high' as ConfidenceLevel, 
    source: 'Validated hiring data (BLS, LinkedIn, company career portals), Feb 2026',
    icon: 'Users',
    trend: '↑ Growing',
    breakdown: [
      { name: 'Sarasota Memorial Health', value: '421', sector: 'Healthcare', distance: '12 miles', url: 'https://careers.smh.com', note: '421 active postings - largest employer' },
      { name: 'MITER Brands (PGT)', value: '245', sector: 'Manufacturing', distance: '8 miles', url: 'https://careers.miterbrands.com', note: 'Acquired PGT March 2024' },
      { name: 'Lakewood Ranch Medical', value: '92', sector: 'Healthcare', distance: '15 miles', url: 'https://careers.uhs.com', note: 'Part of UHS network' },
      { name: 'Benderson Development', value: '29', sector: 'Real Estate', distance: '10 miles', url: 'https://www.benderson.com/careers', note: 'HQ in Bradenton' },
      { name: 'HCA Florida Sarasota', value: '42', sector: 'Healthcare', distance: '15 miles', url: 'https://careers.hcahealthcare.com', note: 'Venice ED expansion' },
      { name: 'Tier 2 Companies', value: '150-200', sector: 'Mixed', distance: 'Various' }
    ],
    commuterBreakdown: [
      { name: 'Raymond James Financial', value: '452', sector: 'Financial Services', distance: '20 miles (St. Pete)', url: 'https://www.raymondjames.com/careers', note: 'Fortune 500, hybrid remote' },
      { name: 'Jabil', value: '89', sector: 'Manufacturing/Tech', distance: '20 miles (St. Pete)', url: 'https://careers.jabil.com/jobs.html?country=United%20States%20of%20America&location=St.%20Petersburg%2FTampa', note: 'St. Pete/Tampa area openings' },
      { name: 'Tampa General Hospital', value: '430', sector: 'Healthcare', distance: '45 miles (Tampa)', url: 'https://www.tgh.org/careers', note: '#1 Hospital Tampa Bay' },
      { name: 'Moffitt Cancer Center', value: '771', sector: 'Healthcare', distance: '50 miles (Tampa)', url: 'https://www.moffitt.org/careers', note: 'NCI Comprehensive Cancer Center' },
      { name: 'Tech Data / TD SYNNEX', value: '56', sector: 'Tech Distribution', distance: '35 miles (Clearwater)', url: 'https://careers.tdsynnex.com', note: 'Remote-friendly, $59B revenue' },
      { name: 'USAA', value: '72', sector: 'Financial Services', distance: '50 miles (Tampa)', url: 'https://www.usaa.com/careers', note: 'Military financial services, remote options' }
    ]
  },
  { 
    label: 'HEALTHCARE HIRING', 
    value: '630-750', 
    unit: 'openings', 
    color: 'blue', 
    confidence: 'high' as ConfidenceLevel, 
    source: 'Validated job postings (LinkedIn, company portals), Feb 2026',
    icon: 'Heart',
    trend: '#1 Sector',
    breakdown: [
      { name: 'Sarasota Memorial Health', value: '421', detail: '421 active postings (careers.smh.com)', url: 'https://careers.smh.com' },
      { name: 'Lakewood Ranch Medical', value: '92', detail: '92 active postings (UHS network)', url: 'https://careers.uhs.com' },
      { name: 'HCA Florida Sarasota', value: '42', detail: '42 active postings (Venice ED)', url: 'https://careers.hcahealthcare.com' },
      { name: 'Manatee Memorial Hospital', value: '75-100', detail: 'Estimated openings', url: 'https://www.blakemedicalcenter.com/careers' }
    ]
  },
  { 
    label: 'LOCAL SWITCHER TRANSFERS', 
    value: '195-260', 
    unit: 'students/yr', 
    color: 'green', 
    confidence: 'medium' as ConfidenceLevel, 
    source: 'Internal enrollment data & feeder school analysis',
    icon: 'Users',
    trend: 'Stable',
    isSankey: true,
    sankeySrc: '/sankey_img_transfers.html',
    sankeySrc2: '/sankey_k8_transitions.html',
    breakdown: [
      { name: 'IMG Academy Transfers', value: '195-260', detail: 'Sports-focused boarding school' },
      { name: 'Local K-8 Transitions', value: '680-850', detail: 'K-8 graduates staying in area' }
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
              
              <div className="flex items-start justify-between mb-3">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest">
                    {kpi.label}
                  </span>
                  {kpi.trend && (
                    <span className="px-2 py-0.5 bg-[#e5e5e0] text-[#0a0a0a] text-[9px] font-mono font-bold uppercase w-fit">
                      {kpi.trend}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
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
                            {item.url ? (
                              <a 
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-[#0a0a0a] hover:text-[#0066ff] hover:underline cursor-pointer"
                              >
                                {item.name} ↗
                              </a>
                            ) : (
                              <div className="font-bold text-[#0a0a0a]">{item.name}</div>
                            )}
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
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                
                {/* Tampa Bay Commuter Section */}
                {kpi.commuterBreakdown && kpi.commuterBreakdown.length > 0 && (
                  <>
                    <div className="my-4 border-t-2 border-[#0a0a0a] pt-3">
                      <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest mb-3">
                        Tampa Bay Commuter Opportunities
                        <span className="block text-[8px] text-[#666] normal-case mt-1">20-50 miles from Bradenton - Remote/Hybrid Friendly</span>
                      </div>
                      <div className="space-y-3">
                        {kpi.commuterBreakdown.map((item: any, i: number) => (
                          <div key={i} className="flex items-start justify-between text-sm">
                            <div className="flex-1">
                              {item.url ? (
                                <a 
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-bold text-[#0a0a0a] hover:text-[#0066ff] hover:underline cursor-pointer"
                                >
                                  {item.name} ↗
                                </a>
                              ) : (
                                <div className="font-bold text-[#0a0a0a]">{item.name}</div>
                              )}
                              {item.sector && (
                                <div className="font-mono text-[9px] text-[#8a8a8a]">{item.sector} | {item.distance}</div>
                              )}
                              {item.note && (
                                <div className="font-mono text-[9px] text-[#8a8a8a]">{item.note}</div>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="font-mono font-bold">{item.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>
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

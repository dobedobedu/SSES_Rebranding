import React from 'react';
import { Printer, Download, Check } from 'lucide-react';
import { PrioritySegmentType, ConfidenceLevel } from '../types';
import { ConfidenceBadge } from './MetricsVisualization';

interface ExecutiveDashboardProps {
  onSegmentClick?: (segment: PrioritySegmentType) => void;
  prioritySegments: string[];
  onTogglePriority?: (segmentId: string) => void;
}

const SEGMENTS = [
  { id: 'corp', label: 'CORPORATE RELOCATOR', color: '#4a4a4a', description: '700-800 families/year relocating' },
  { id: 'life', label: 'LIFESTYLE ENTREPRENEUR', color: '#00cc66', description: '500-750 content creators' },
  { id: 'pivot', label: 'IMG SWITCHER', color: '#ff6b00', description: '195-260 annual transfers' },
  { id: 'bridge', label: 'BRIDGE CROSSER', color: '#0066ff', description: '680-850 K-8 graduates' },
  { id: 'teen', label: 'TEEN ADVOCATE', color: '#9933ff', description: 'Student influence' }
];

const KPI_DATA = [
  { label: 'K-8 PIPELINE', value: '680-850', unit: 'families/yr', color: 'blue', confidence: 'medium' as ConfidenceLevel, source: 'Student_Journey_Analysis_Report.md:148' },
  { label: 'IMG OPPORTUNITY', value: '195-260', unit: 'transfers/yr', color: 'amber', confidence: 'medium' as ConfidenceLevel, source: 'Student_Journey_Analysis_Report.md:14' },
  { label: 'SSES CAPTURES', value: '80-105', unit: 'students/yr', color: 'default', confidence: 'low' as ConfidenceLevel, source: 'Estimated from transfer data' },
  { label: 'VOUCHER VALUE', value: '$8,000+', unit: '/year', color: 'green', confidence: 'high' as ConfidenceLevel, source: 'HIGH_CONFIDENCE_DATA_ANALYSIS.md:241' }
];

const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  onSegmentClick,
  prioritySegments,
  onTogglePriority
}) => {
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

KEY METRICS
-----------
K-8 Pipeline: 680-850 families/year (MEDIUM confidence)
IMG Opportunity: 195-260 students/year (MEDIUM confidence)
SSES Captures: 80-105 students/year (LOW confidence)
Voucher Value: $8,000+/year (HIGH confidence)

SOURCE CITATIONS
----------------
- Student_Journey_Analysis_Report.md
- EXECUTIVE_SUMMARY_Refined_Research.md
- HIGH_CONFIDENCE_DATA_ANALYSIS.md
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
    <div className="no-print bg-[#f5f5f0] border-b-2 border-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-[#ff6b00]" />
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
              className="flex items-center gap-2 px-3 py-2 bg-[#ff6b00] text-white border-2 border-[#ff6b00] font-mono text-[10px] uppercase tracking-wider hover:bg-white hover:text-[#ff6b00] hover:border-[#ff6b00] transition-all"
            >
              <Download className="w-3 h-3" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#0a0a0a] border-2 border-[#0a0a0a] mb-6">
          {KPI_DATA.map((kpi, index) => (
            <div
              key={index}
              className={`te-kpi bg-[#fafafa] p-4 md:p-6 pl-6 relative`}
              style={kpi.color === 'amber' ? { '--accent': '#ff6b00' } : kpi.color === 'blue' ? { '--accent': '#0066ff' } : kpi.color === 'green' ? { '--accent': '#00cc66' } : {}}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: kpi.color === 'amber' ? '#ff6b00' : kpi.color === 'blue' ? '#0066ff' : kpi.color === 'green' ? '#00cc66' : '#0a0a0a' }} />
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest mb-2">
                    {kpi.label}
                  </div>
                  <div className="font-mono text-2xl md:text-3xl font-bold tracking-tight">
                    {kpi.value}
                  </div>
                  <div className="font-mono text-[10px] text-[#4a4a4a] uppercase tracking-wide mt-1">
                    {kpi.unit}
                  </div>
                </div>
                <ConfidenceBadge confidence={kpi.confidence} />
              </div>
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

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#0a0a0a] border-2 border-[#0a0a0a] mt-6">
          <div className="bg-[#0a0a0a] text-white p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-2xl font-bold text-[#00cc66]">$66K</div>
                <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-wider">vs IMG Tuition</div>
              </div>
              <ConfidenceBadge confidence="high" />
            </div>
          </div>
          <div className="bg-[#0a0a0a] text-white p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-2xl font-bold text-[#0066ff]">50%</div>
                <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-wider">Mid-Budget Segment</div>
              </div>
              <ConfidenceBadge confidence="medium" />
            </div>
          </div>
          <div className="bg-[#0a0a0a] text-white p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-2xl font-bold text-[#ff6b00]">40%</div>
                <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-wider">Montessori Transitions</div>
              </div>
              <ConfidenceBadge confidence="medium" />
            </div>
          </div>
          <div className="bg-[#0a0a0a] text-white p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-2xl font-bold text-[#9933ff]">9:1</div>
                <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-wider">Student-Teacher Ratio</div>
              </div>
              <ConfidenceBadge confidence="high" />
            </div>
          </div>
        </div>

        {/* Source Legend */}
        <div className="mt-4 p-3 bg-white border border-[#0a0a0a]">
          <div className="font-mono text-[9px] text-[#8a8a8a] uppercase tracking-wider mb-2">Confidence Levels:</div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-1">
              <ConfidenceBadge confidence="high" />
              <span className="font-mono text-[9px] text-[#8a8a8a]">Verified official data</span>
            </div>
            <div className="flex items-center gap-1">
              <ConfidenceBadge confidence="medium" />
              <span className="font-mono text-[9px] text-[#8a8a8a]">Cross-referenced/aggregated</span>
            </div>
            <div className="flex items-center gap-1">
              <ConfidenceBadge confidence="low" />
              <span className="font-mono text-[9px] text-[#8a8a8a]">Estimated/inferred</span>
            </div>
            <div className="flex items-center gap-1">
              <ConfidenceBadge confidence="unverified" />
              <span className="font-mono text-[9px] text-[#8a8a8a]">Not found in research</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;

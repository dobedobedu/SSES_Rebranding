import React from 'react';
import { TrendingUp, Users, Target, Zap, Printer, Download } from 'lucide-react';
import { PrioritySegmentType } from '../types';

interface ExecutiveDashboardProps {
  onSegmentClick?: (segment: PrioritySegmentType) => void;
}

const PRIORITY_SEGMENTS = [
  { id: 'img-switcher' as PrioritySegmentType, label: 'IMG SWITCHER', color: 'amber', value: '195-260', unit: 'transfers/yr' },
  { id: 'bridge-crosser' as PrioritySegmentType, label: 'BRIDGE CROSSER', color: 'blue', value: '680-850', unit: 'graduates/yr' },
  { id: 'teen-driver' as PrioritySegmentType, label: 'TEEN DRIVER', color: 'purple', value: '60%+', unit: 'veto power' }
];

const KPI_DATA = [
  { label: 'K-8 PIPELINE', value: '680-850', unit: 'families/yr', color: 'blue' },
  { label: 'IMG OPPORTUNITY', value: '195-260', unit: 'transfers/yr', color: 'amber' },
  { label: 'SSES CAPTURES', value: '80-105', unit: 'students/yr', color: 'default' },
  { label: 'TEEN INFLUENCE', value: '60%+', unit: 'veto power', color: 'purple' }
];

const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({ onSegmentClick }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const exportData = `
SSES Strategic Growth Matrix - Executive Summary
================================================
Generated: ${new Date().toLocaleDateString()}

KEY METRICS
-----------
K-8 Pipeline: 680-850 families/year
IMG Transfers: 195-260 students/year
SSES Captures: 80-105 students/year
Teen Veto Influence: 60%+ of decisions

PRIORITY SEGMENTS
-----------------
1. IMG Switcher - 195-260 annual transfers
2. Bridge Crosser - 680-850 annual K-8 graduates
3. Teen Driver - 60%+ veto power
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
              <p className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest">Key Metrics Overview</p>
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
              className={`te-kpi ${kpi.color === 'amber' ? 'te-kpi-amber' : kpi.color === 'blue' ? 'te-kpi-blue' : kpi.color === 'purple' ? 'te-kpi-purple' : ''} bg-[#fafafa] p-4 md:p-6 pl-6 relative`}
            >
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
          ))}
        </div>

        {/* Priority Segments */}
        <div className="bg-[#fafafa] border-2 border-[#0a0a0a]">
          <div className="border-b border-[#0a0a0a] px-4 py-2 bg-[#0a0a0a]">
            <span className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest">Priority Segments</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {PRIORITY_SEGMENTS.map((segment) => (
              <button
                key={segment.id}
                onClick={() => onSegmentClick?.(segment.id)}
                className="flex items-center gap-4 p-4 border-r border-[#e5e5e0] last:border-r-0 border-b md:border-b-0 hover:bg-[#f0f0eb] transition-all group text-left"
              >
                <div className={`w-8 h-8 flex items-center justify-center font-mono text-xs font-bold text-white
                  ${segment.color === 'amber' ? 'bg-[#ff6b00]' : ''}
                  ${segment.color === 'blue' ? 'bg-[#0066ff]' : ''}
                  ${segment.color === 'purple' ? 'bg-[#9933ff]' : ''}
                `}>
                  {segment.value.split('-')[0]}
                </div>
                <div className="flex-1">
                  <div className="font-mono text-xs font-bold uppercase tracking-wide group-hover:text-[#ff6b00] transition-colors">
                    {segment.label}
                  </div>
                  <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-wider">
                    {segment.value} {segment.unit}
                  </div>
                </div>
                <div className="font-mono text-[10px] text-[#8a8a8a] group-hover:text-[#0a0a0a] transition-colors">
                  →
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#0a0a0a] border-2 border-[#0a0a0a] mt-6">
          <div className="bg-[#0a0a0a] text-white p-4">
            <div className="font-mono text-2xl font-bold text-[#00cc66]">$66K</div>
            <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-wider">vs IMG Tuition</div>
          </div>
          <div className="bg-[#0a0a0a] text-white p-4">
            <div className="font-mono text-2xl font-bold text-[#0066ff]">50%</div>
            <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-wider">Mid-Budget Segment</div>
          </div>
          <div className="bg-[#0a0a0a] text-white p-4">
            <div className="font-mono text-2xl font-bold text-[#ff6b00]">40%</div>
            <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-wider">Montessori Transitions</div>
          </div>
          <div className="bg-[#0a0a0a] text-white p-4">
            <div className="font-mono text-2xl font-bold text-[#9933ff]">5+</div>
            <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-wider">Discovery Channels</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;

import React from 'react';
import { PrioritySegmentType, MatrixColumn } from '../types';

interface SegmentQuickViewProps {
  segmentData: { personaId: string | null; colIndex: number | null };
  isVisible: boolean;
  position: { x: number; y: number };
}

interface QuickInsight {
  icon: string;
  label: string;
  value: string;
}

// Map insights per cell based on cross_segment_synthesis.md and core data
const getCellInsights = (personaId: string, colIndex: number): { title: string; color: string; insights: QuickInsight[] } | null => {
  const getBaseColor = (id: string) => {
    switch (id) {
      case 'corp': return '#4a4a4a';
      case 'life': return '#00cc66';
      case 'pivot': return '#2D8F6F';
      case 'bridge': return '#0066ff';
      case 'teen': return '#9933ff';
      default: return '#0a0a0a';
    }
  };

  const color = getBaseColor(personaId);
  const getTitle = (id: string, col: number) => {
    const names: Record<string, string> = {
      'corp': 'CORPORATE RELOCATOR',
      'life': 'LIFESTYLE ENTREPRENEUR',
      'pivot': 'IMG SWITCHER',
      'bridge': 'BRIDGE CROSSER',
      'teen': 'TEEN ADVOCATE'
    };
    const columns = ['JOURNEY', 'LOCATION', 'BUDGET', 'COMPETITION', 'STRATEGY'];
    return `${names[id]} - ${columns[col]}`;
  };

  const title = getTitle(personaId, colIndex);

  // Define specific insights per cell based on the research doc
  if (personaId === 'corp') {
    switch (colIndex) {
      case 0: return { title, color, insights: [{ icon: '!', label: 'URGENCY', value: '90-day search window' }, { icon: '➔', label: 'TRIGGER', value: 'Corporate Relocation' }] };
      case 1: return { title, color, insights: [{ icon: 'A', label: 'HOT ZONE', value: 'Lakewood Ranch (34211)' }, { icon: 'B', label: 'HOT ZONE', value: 'Downtown Sarasota' }] };
      case 2: return { title, color, insights: [{ icon: '$', label: 'SENSITIVITY', value: 'Low sensitivity' }, { icon: 'C', label: 'COVERAGE', value: 'Often uses relo-package' }] };
      case 3: return { title, color, insights: [{ icon: '1', label: 'COMPETITOR', value: 'Out-of-Door Academy' }, { icon: '2', label: 'COMPETITOR', value: 'Berkeley Prep' }] };
      case 4: return { title, color, insights: [{ icon: '★', label: 'VALUE', value: 'Full-tuition payment' }, { icon: 'N', label: 'NETWORK', value: 'Professional connectivity' }] };
    }
  }

  if (personaId === 'life') {
    switch (colIndex) {
      case 0: return { title, color, insights: [{ icon: 'V', label: 'FOCUS', value: 'Visual First Impressions' }, { icon: 'T', label: 'TACTIC', value: '"Founder Friday" shadows' }] };
      case 1: return { title, color, insights: [{ icon: 'A', label: 'HUB', value: 'Remote/Nomadic' }, { icon: 'B', label: 'EXPECTS', value: 'Maker spaces & WiFi' }] };
      case 2: return { title, color, insights: [{ icon: '$', label: 'SENSITIVITY', value: 'Value-driven innovation' }, { icon: '+', label: 'ADD-ON', value: 'Marine Expeditions ($5-10k)' }] };
      case 3: return { title, color, insights: [{ icon: '1', label: 'COMPETITOR', value: 'Out-of-Door Academy' }, { icon: '2', label: 'COMPETITOR', value: 'Microschools/Asher' }] };
      case 4: return { title, color, insights: [{ icon: '★', label: 'VALUE', value: 'Innovation ecosystem' }, { icon: 'M', label: 'MENTORSHIP', value: 'Real-world business mentors' }] };
    }
  }

  if (personaId === 'pivot') {
    switch (colIndex) {
      case 0: return { title, color, insights: [{ icon: '!', label: 'CRISIS', value: 'Academic/Athletic burnout' }, { icon: 'T', label: 'TIMING', value: 'Tuition renewal period' }] };
      case 1: return { title, color, insights: [{ icon: 'A', label: 'HUB', value: 'West Bradenton (34209)' }, { icon: 'B', label: 'PROXIMITY', value: 'IMG Academy radius' }] };
      case 2: return { title, color, insights: [{ icon: '$', label: 'SAVINGS', value: '$66,255 vs IMG' }, { icon: 'C', label: 'BUDGET', value: '$91k+ baseline' }] };
      case 3: return { title, color, insights: [{ icon: '1', label: 'COMPETITOR', value: 'IMG Academy' }, { icon: '2', label: 'COMPETITOR', value: 'Cardinal Mooney' }] };
      case 4: return { title, color, insights: [{ icon: '★', label: 'VALUE', value: 'Athletic excellence' }, { icon: 'V', label: 'VISIBILITY', value: 'College recruitment' }] };
    }
  }

  if (personaId === 'bridge') {
    switch (colIndex) {
      case 0: return { title, color, insights: [{ icon: 'T', label: 'TIMING', value: '12-18mo pre-graduation' }, { icon: 'N', label: 'NETWORK', value: 'Center Montessori & Religious' }] };
      case 1: return { title, color, insights: [{ icon: 'A', label: 'HUB', value: 'Local Bradenton/Sarasota' }, { icon: 'B', label: 'EXPECTS', value: 'Community roots' }] };
      case 2: return { title, color, insights: [{ icon: '$', label: 'SENSITIVITY', value: 'Mid-budget dominant' }, { icon: 'V', label: 'VALUE', value: 'ROI vs Public Free' }] };
      case 3: return { title, color, insights: [{ icon: '1', label: 'COMPETITOR', value: 'Lakewood Ranch High (A-rated)' }, { icon: '2', label: 'COMPETITOR', value: 'Manatee High' }] };
      case 4: return { title, color, insights: [{ icon: '★', label: 'VALUE', value: 'Stable multi-year enrollment' }, { icon: 'W', label: 'WORD OF MOUTH', value: 'Strong local referral' }] };
    }
  }

  if (personaId === 'teen') {
    switch (colIndex) {
      case 0: return { title, color, insights: [{ icon: 'V', label: 'POWER', value: '60%+ Veto influence' }, { icon: 'S', label: 'SOURCE', value: 'Instagram/TikTok Discovery' }] };
      case 1: return { title, color, insights: [{ icon: 'A', label: 'FOCUS', value: 'Campus Aesthetic' }, { icon: 'B', label: 'EXPECTS', value: 'Food quality & Social culture' }] };
      case 2: return { title, color, insights: [{ icon: '$', label: 'FUNDS', value: 'Senior Privileges ($3-5k)' }, { icon: 'A', label: 'AUTONOMY', value: 'Extracurricular control' }] };
      case 3: return { title, color, insights: [{ icon: '1', label: 'COMPETITOR', value: 'Pine View' }, { icon: '2', label: 'COMPETITOR', value: 'Progressive Models' }] };
      case 4: return { title, color, insights: [{ icon: '★', label: 'VALUE', value: 'Peer-to-peer recruitment' }, { icon: 'P', label: 'PRIDE', value: 'Genuine campus culture' }] };
    }
  }

  return null;
};


const SegmentQuickView: React.FC<SegmentQuickViewProps> = ({
  segmentData,
  isVisible,
  position
}) => {
  if (!segmentData || !segmentData.personaId || segmentData.colIndex === null || !isVisible) return null;

  const insights = getCellInsights(segmentData.personaId, segmentData.colIndex);
  if (!insights) return null;

  return (
    <div
      className={`
        fixed z-[100] w-64 border-2 border-[#0a0a0a]
        bg-[#fafafa] shadow-[8px_8px_0_#0a0a0a]
        transform transition-all duration-150
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
      `}
      style={{
        left: `${Math.min(position.x + 15, window.innerWidth - 280)}px`,
        top: `${Math.min(position.y + 15, window.innerHeight - 200)}px`
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-2 flex items-center gap-2 border-b-2 border-[#0a0a0a]"
        style={{ backgroundColor: insights.color }}
      >
        <span className="w-2 h-2 bg-white" />
        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
          {insights.title}
        </span>
      </div>

      {/* Insights */}
      <div className="p-0">
        {insights.insights.map((insight, index) => (
          <div
            key={index}
            className="flex items-stretch border-b border-[#e5e5e0] last:border-b-0"
          >
            <div
              className="w-10 flex items-center justify-center font-mono text-xs font-bold"
              style={{ color: insights.color, backgroundColor: '#f0f0eb' }}
            >
              {insight.icon}
            </div>
            <div className="flex-1 p-3">
              <div className="font-mono text-[9px] text-[#8a8a8a] uppercase tracking-widest">
                {insight.label}
              </div>
              <div className="font-mono text-xs font-bold mt-0.5">
                {insight.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer hint */}
      <div className="px-3 py-2 bg-[#0a0a0a]">
        <div className="font-mono text-[9px] text-[#8a8a8a] text-center uppercase tracking-wider">
          Click to view full details
        </div>
      </div>
    </div>
  );
};

export default SegmentQuickView;

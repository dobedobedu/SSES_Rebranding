import React from 'react';
import { PrioritySegmentType } from '../types';

interface SegmentQuickViewProps {
  segmentType: PrioritySegmentType;
  isVisible: boolean;
  position: { x: number; y: number };
}

interface QuickInsight {
  icon: string;
  label: string;
  value: string;
}

const SEGMENT_INSIGHTS: Record<Exclude<PrioritySegmentType, null>, { title: string; color: string; insights: QuickInsight[] }> = {
  'img-switcher': {
    title: 'IMG SWITCHER',
    color: '#2D8F6F',
    insights: [
      { icon: '01', label: 'ANNUAL TRANSFERS', value: '195-260 students' },
      { icon: '02', label: 'TOP REASON', value: '44% Financial burden' },
      { icon: '03', label: 'SSES SAVINGS', value: '$66,255 vs IMG' }
    ]
  },
  'bridge-crosser': {
    title: 'BRIDGE CROSSER',
    color: '#0066ff',
    insights: [
      { icon: '01', label: 'K-8 GRADUATES', value: '680-850 annually' },
      { icon: '02', label: 'TOP SOURCE', value: '40% Montessori' },
      { icon: '03', label: 'SSES CAPTURES', value: '80-105 students' }
    ]
  },
  'teen-driver': {
    title: 'TEEN DRIVER',
    color: '#9933ff',
    insights: [
      { icon: '01', label: 'VETO POWER', value: '60%+ influence' },
      { icon: '02', label: 'TOP CHANNEL', value: 'Instagram/TikTok' },
      { icon: '03', label: 'KEY FACTOR', value: 'Campus aesthetic' }
    ]
  }
};

const SegmentQuickView: React.FC<SegmentQuickViewProps> = ({
  segmentType,
  isVisible,
  position
}) => {
  if (!segmentType || !isVisible) return null;

  const segmentData = SEGMENT_INSIGHTS[segmentType];
  if (!segmentData) return null;

  return (
    <div
      className={`
        fixed z-[100] w-64 border-2 border-[#0a0a0a]
        bg-[#fafafa] shadow-[8px_8px_0_#0a0a0a]
        transform transition-all duration-150
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
      `}
      style={{
        left: `${Math.min(position.x, window.innerWidth - 280)}px`,
        top: `${Math.min(position.y + 10, window.innerHeight - 200)}px`
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-2 flex items-center gap-2 border-b-2 border-[#0a0a0a]"
        style={{ backgroundColor: segmentData.color }}
      >
        <span className="w-2 h-2 bg-white" />
        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
          {segmentData.title}
        </span>
      </div>

      {/* Insights */}
      <div className="p-0">
        {segmentData.insights.map((insight, index) => (
          <div
            key={index}
            className="flex items-stretch border-b border-[#e5e5e0] last:border-b-0"
          >
            <div
              className="w-10 flex items-center justify-center font-mono text-xs font-bold"
              style={{ color: segmentData.color, backgroundColor: '#f0f0eb' }}
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

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
    title: 'IMG Switcher',
    color: 'amber',
    insights: [
      { icon: '📊', label: 'Annual Transfers', value: '195-260 students' },
      { icon: '💰', label: 'Top Reason', value: '44% Financial burden' },
      { icon: '💵', label: 'SSES Savings', value: '$66,255 vs IMG' }
    ]
  },
  'bridge-crosser': {
    title: 'Bridge Crosser',
    color: 'blue',
    insights: [
      { icon: '🎓', label: 'K-8 Graduates', value: '680-850 annually' },
      { icon: '🏫', label: 'Top Source', value: '40% Montessori' },
      { icon: '📈', label: 'SSES Captures', value: '80-105 students' }
    ]
  },
  'teen-driver': {
    title: 'Teen Driver',
    color: 'purple',
    insights: [
      { icon: '✋', label: 'Veto Power', value: '60%+ influence' },
      { icon: '📱', label: 'Top Channel', value: 'Instagram/TikTok' },
      { icon: '🎯', label: 'Key Factor', value: 'Campus aesthetic' }
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

  const colorClasses = {
    amber: {
      bg: 'bg-amber-50',
      border: 'border-amber-300',
      header: 'bg-amber-100',
      text: 'text-amber-700',
      dot: 'bg-amber-500'
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      header: 'bg-blue-100',
      text: 'text-blue-700',
      dot: 'bg-blue-500'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-300',
      header: 'bg-purple-100',
      text: 'text-purple-700',
      dot: 'bg-purple-500'
    }
  };

  const colors = colorClasses[segmentData.color as keyof typeof colorClasses];

  return (
    <div
      className={`
        fixed z-[100] w-64 rounded-xl border-2 shadow-2xl
        ${colors.bg} ${colors.border}
        transform transition-all duration-200
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
      `}
      style={{
        left: `${Math.min(position.x, window.innerWidth - 280)}px`,
        top: `${Math.min(position.y + 10, window.innerHeight - 200)}px`
      }}
    >
      {/* Header */}
      <div className={`${colors.header} px-4 py-2 rounded-t-lg flex items-center gap-2`}>
        <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
        <span className={`font-bold text-sm ${colors.text}`}>{segmentData.title}</span>
      </div>

      {/* Insights */}
      <div className="p-3 space-y-2">
        {segmentData.insights.map((insight, index) => (
          <div key={index} className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2">
            <span className="text-base">{insight.icon}</span>
            <div className="flex-1">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">
                {insight.label}
              </div>
              <div className="text-sm font-bold text-slate-900">
                {insight.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer hint */}
      <div className="px-3 pb-2">
        <div className="text-[10px] text-slate-400 text-center">
          Click to view full details
        </div>
      </div>
    </div>
  );
};

export default SegmentQuickView;

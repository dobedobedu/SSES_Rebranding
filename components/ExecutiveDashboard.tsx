import React from 'react';
import { Users, TrendingUp, GraduationCap, ThumbsUp, Printer, Download } from 'lucide-react';
import KPICard from './KPICard';
import ExportControls from './ExportControls';
import { PrioritySegmentType } from '../types';

interface ExecutiveDashboardProps {
  onSegmentClick?: (segment: PrioritySegmentType) => void;
}

const PRIORITY_SEGMENTS = [
  { id: 'img-switcher' as PrioritySegmentType, label: 'IMG Switcher', color: 'amber', description: 'IMG Academy transfers seeking academics + athletics' },
  { id: 'bridge-crosser' as PrioritySegmentType, label: 'Bridge Crosser', color: 'blue', description: 'Local K-8 graduates seeking upper school' },
  { id: 'teen-driver' as PrioritySegmentType, label: 'Teen Driver', color: 'purple', description: 'Student-led enrollment decisions' }
];

const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({ onSegmentClick }) => {
  return (
    <div className="no-print bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Row */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Executive Summary</h2>
            <p className="text-slate-500 text-sm mt-1">Key metrics for strategic growth opportunities</p>
          </div>
          <ExportControls />
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard
            primaryValue="680-850"
            secondaryLabel="K-8 Pipeline / Year"
            icon={<GraduationCap className="w-5 h-5" />}
            accentColor="blue"
            trend="up"
            trendValue="Growing market"
          />
          <KPICard
            primaryValue="195-260"
            secondaryLabel="IMG Transfers / Year"
            icon={<TrendingUp className="w-5 h-5" />}
            accentColor="amber"
            trend="up"
            trendValue="44% financial reasons"
          />
          <KPICard
            primaryValue="80-105"
            secondaryLabel="SSES Captures / Year"
            icon={<Users className="w-5 h-5" />}
            accentColor="emerald"
            trend="up"
            trendValue="From K-8 pipeline"
          />
          <KPICard
            primaryValue="60%+"
            secondaryLabel="Teen Veto Power"
            icon={<ThumbsUp className="w-5 h-5" />}
            accentColor="purple"
            trend="neutral"
            trendValue="Influence on decisions"
          />
        </div>

        {/* Priority Segments */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Priority Segments
          </h3>
          <div className="flex flex-wrap gap-3">
            {PRIORITY_SEGMENTS.map((segment) => (
              <button
                key={segment.id}
                onClick={() => onSegmentClick?.(segment.id)}
                className={`
                  group flex items-center gap-2 px-4 py-3 rounded-xl border transition-all
                  hover:shadow-md hover:scale-[1.02] active:scale-[0.98]
                  ${segment.color === 'amber' ? 'bg-amber-50 border-amber-200 hover:border-amber-300' : ''}
                  ${segment.color === 'blue' ? 'bg-blue-50 border-blue-200 hover:border-blue-300' : ''}
                  ${segment.color === 'purple' ? 'bg-purple-50 border-purple-200 hover:border-purple-300' : ''}
                `}
              >
                <span className={`
                  w-3 h-3 rounded-full
                  ${segment.color === 'amber' ? 'bg-amber-500' : ''}
                  ${segment.color === 'blue' ? 'bg-blue-500' : ''}
                  ${segment.color === 'purple' ? 'bg-purple-500' : ''}
                `} />
                <div className="text-left">
                  <div className="font-bold text-slate-900 text-sm">{segment.label}</div>
                  <div className="text-xs text-slate-500 group-hover:text-slate-700">{segment.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <div className="text-2xl font-black text-emerald-600">$66K</div>
            <div className="text-xs text-slate-500 font-medium">Savings vs IMG</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="text-2xl font-black text-blue-600">50%</div>
            <div className="text-xs text-slate-500 font-medium">Mid-Budget Segment</div>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <div className="text-2xl font-black text-amber-600">40%</div>
            <div className="text-xs text-slate-500 font-medium">Montessori Transitions</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
            <div className="text-2xl font-black text-purple-600">5+</div>
            <div className="text-xs text-slate-500 font-medium">Discovery Channels</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;

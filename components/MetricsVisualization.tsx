import React from 'react';
import { IMGTransferMetrics, K8TransitionMetrics, TeenInfluenceMetrics } from '../types';

interface HorizontalBarChartProps {
  data: { label: string; value: number; color?: string }[];
  maxValue?: number;
  showPercentage?: boolean;
}

export const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  data,
  maxValue,
  showPercentage = true
}) => {
  const max = maxValue || Math.max(...data.map(d => d.value));

  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="group">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-slate-700">{item.label}</span>
            <span className="text-sm font-bold text-slate-900">
              {showPercentage ? `${item.value}%` : item.value}
            </span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 group-hover:opacity-80"
              style={{
                width: `${(item.value / max) * 100}%`,
                backgroundColor: item.color || '#10b981'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

interface IMGTransferVisualizationProps {
  metrics: IMGTransferMetrics;
}

export const IMGTransferVisualization: React.FC<IMGTransferVisualizationProps> = ({ metrics }) => {
  const reasonData = [
    { label: 'Financial', value: metrics.reasons.financial, color: '#f59e0b' },
    { label: 'Athletic', value: metrics.reasons.athletic, color: '#3b82f6' },
    { label: 'Academic', value: metrics.reasons.academic, color: '#10b981' },
    { label: 'Relocation', value: metrics.reasons.relocation, color: '#8b5cf6' }
  ];

  const destinationData = [
    { label: 'Private School', value: metrics.destinations.privateSchool, color: '#10b981' },
    { label: 'Public School', value: metrics.destinations.publicSchool, color: '#3b82f6' },
    { label: 'Out of State', value: metrics.destinations.outOfState, color: '#f59e0b' },
    { label: 'Other', value: metrics.destinations.other, color: '#6b7280' }
  ];

  return (
    <div className="bg-amber-50 rounded-[32px] p-8 border border-amber-200">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-3 h-3 bg-amber-500 rounded-full" />
        <h4 className="text-lg font-bold text-slate-900">IMG Transfer Analysis</h4>
        <span className="text-xs text-slate-500 font-medium">({metrics.timeframe})</span>
      </div>

      {/* Total Transfers */}
      <div className="bg-white rounded-2xl p-6 mb-6 border border-amber-100">
        <div className="text-center">
          <div className="text-4xl font-black text-amber-600">
            {metrics.totalTransfers.min}-{metrics.totalTransfers.max}
          </div>
          <div className="text-sm text-slate-500 font-medium mt-1">Annual Transfers</div>
        </div>
      </div>

      {/* Transfer Reasons */}
      <div className="mb-6">
        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
          Transfer Reasons
        </h5>
        <HorizontalBarChart data={reasonData} />
      </div>

      {/* Destinations */}
      <div className="mb-6">
        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
          Where They Go
        </h5>
        <HorizontalBarChart data={destinationData} />
      </div>

      {/* SSES Advantage */}
      <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200">
        <h5 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-4">
          SSES Competitive Advantage
        </h5>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-black text-slate-400 line-through">
              ${metrics.ssesAdvantage.imgTuition.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500">IMG Tuition</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-emerald-600">
              ${metrics.ssesAdvantage.ssesTuition.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500">SSES Tuition</div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-emerald-200 text-center">
          <div className="text-3xl font-black text-emerald-600">
            ${metrics.ssesAdvantage.tuitionSavings.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 font-medium">Annual Savings</div>
        </div>
      </div>
    </div>
  );
};

interface K8TransitionVisualizationProps {
  metrics: K8TransitionMetrics;
}

export const K8TransitionVisualization: React.FC<K8TransitionVisualizationProps> = ({ metrics }) => {
  const schoolTypeData = [
    { label: 'Montessori', value: metrics.schoolTypes.montessori, color: '#3b82f6' },
    { label: 'Religious', value: metrics.schoolTypes.religious, color: '#8b5cf6' },
    { label: 'Other Private', value: metrics.schoolTypes.otherPrivate, color: '#10b981' },
    { label: 'Public', value: metrics.schoolTypes.public, color: '#6b7280' }
  ];

  const budgetData = [
    { label: 'High Budget ($40K+)', value: metrics.budgetSegments.high, color: '#f59e0b' },
    { label: 'Mid Budget ($25K-$40K)', value: metrics.budgetSegments.mid, color: '#3b82f6' },
    { label: 'Low Budget (<$25K)', value: metrics.budgetSegments.low, color: '#6b7280' }
  ];

  return (
    <div className="bg-blue-50 rounded-[32px] p-8 border border-blue-200">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-3 h-3 bg-blue-500 rounded-full" />
        <h4 className="text-lg font-bold text-slate-900">K-8 Transition Analysis</h4>
        <span className="text-xs text-slate-500 font-medium">({metrics.annualRange})</span>
      </div>

      {/* Total Graduates */}
      <div className="bg-white rounded-2xl p-6 mb-6 border border-blue-100">
        <div className="text-center">
          <div className="text-4xl font-black text-blue-600">
            {metrics.totalGraduates.min}-{metrics.totalGraduates.max}
          </div>
          <div className="text-sm text-slate-500 font-medium mt-1">Annual K-8 Graduates</div>
        </div>
      </div>

      {/* School Types */}
      <div className="mb-6">
        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
          Source School Types
        </h5>
        <HorizontalBarChart data={schoolTypeData} />
      </div>

      {/* Budget Segments */}
      <div className="mb-6">
        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
          Budget Segments
        </h5>
        <HorizontalBarChart data={budgetData} />
      </div>

      {/* SSES Captures */}
      <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200">
        <h5 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-4">
          SSES Opportunity
        </h5>
        <div className="text-center">
          <div className="text-4xl font-black text-emerald-600">
            {metrics.ssesCaptures.min}-{metrics.ssesCaptures.max}
          </div>
          <div className="text-sm text-slate-500 font-medium mt-1">Potential Captures Annually</div>
        </div>
        <div className="mt-4 pt-4 border-t border-emerald-200">
          <div className="text-center text-sm text-slate-600">
            <span className="font-bold text-emerald-600">
              {Math.round((metrics.ssesCaptures.min / metrics.totalGraduates.min) * 100)}-
              {Math.round((metrics.ssesCaptures.max / metrics.totalGraduates.max) * 100)}%
            </span>
            {' '}capture rate potential
          </div>
        </div>
      </div>
    </div>
  );
};

interface TeenInfluenceVisualizationProps {
  metrics: TeenInfluenceMetrics;
}

export const TeenInfluenceVisualization: React.FC<TeenInfluenceVisualizationProps> = ({ metrics }) => {
  return (
    <div className="bg-purple-50 rounded-[32px] p-8 border border-purple-200">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-3 h-3 bg-purple-500 rounded-full" />
        <h4 className="text-lg font-bold text-slate-900">Teen Influence Analysis</h4>
      </div>

      {/* Veto Power */}
      <div className="bg-white rounded-2xl p-6 mb-6 border border-purple-100">
        <div className="text-center">
          <div className="text-4xl font-black text-purple-600">
            {metrics.vetoPercentage}%+
          </div>
          <div className="text-sm text-slate-500 font-medium mt-1">Veto Power on Parent Decisions</div>
        </div>
      </div>

      {/* Discovery Channels */}
      <div className="mb-6">
        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
          Discovery Channels
        </h5>
        <div className="flex flex-wrap gap-2">
          {metrics.discoveryChannels.map((channel, index) => (
            <span
              key={index}
              className="px-3 py-2 bg-white rounded-lg border border-purple-200 text-sm font-medium text-slate-700"
            >
              {channel}
            </span>
          ))}
        </div>
      </div>

      {/* Key Factors */}
      <div>
        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
          Key Decision Factors
        </h5>
        <div className="space-y-2">
          {metrics.keyFactors.map((factor, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 border border-purple-100"
            >
              <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-bold text-purple-600">
                {index + 1}
              </span>
              <span className="text-sm font-medium text-slate-700">{factor}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default {
  HorizontalBarChart,
  IMGTransferVisualization,
  K8TransitionVisualization,
  TeenInfluenceVisualization
};

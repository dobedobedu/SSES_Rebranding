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
            <span className="font-mono text-xs text-[#0a0a0a] uppercase tracking-wide">{item.label}</span>
            <span className="font-mono text-xs font-bold">
              {showPercentage ? `${item.value}%` : item.value}
            </span>
          </div>
          <div className="h-2 bg-[#2a2a2a] border border-[#0a0a0a] overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${(item.value / max) * 100}%`,
                backgroundColor: item.color || '#ff6b00'
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
    { label: 'Financial', value: metrics.reasons.financial, color: '#ff6b00' },
    { label: 'Athletic', value: metrics.reasons.athletic, color: '#0066ff' },
    { label: 'Academic', value: metrics.reasons.academic, color: '#00cc66' },
    { label: 'Relocation', value: metrics.reasons.relocation, color: '#9933ff' }
  ];

  const destinationData = [
    { label: 'Private School', value: metrics.destinations.privateSchool, color: '#00cc66' },
    { label: 'Public School', value: metrics.destinations.publicSchool, color: '#0066ff' },
    { label: 'Out of State', value: metrics.destinations.outOfState, color: '#ff6b00' },
    { label: 'Other', value: metrics.destinations.other, color: '#4a4a4a' }
  ];

  return (
    <div className="border-2 border-[#ff6b00] bg-white">
      <div className="border-b border-[#ff6b00] px-4 py-2 bg-[#ff6b00] flex items-center gap-2">
        <span className="w-2 h-2 bg-white" />
        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">IMG Transfer Analysis</span>
        <span className="font-mono text-[10px] text-white/70 ml-auto">{metrics.timeframe}</span>
      </div>

      <div className="p-6 space-y-6">
        {/* Total Transfers */}
        <div className="border-2 border-[#0a0a0a] p-6 bg-[#f5f5f0]">
          <div className="text-center">
            <div className="font-mono text-4xl font-bold text-[#ff6b00]">
              {metrics.totalTransfers.min}-{metrics.totalTransfers.max}
            </div>
            <div className="font-mono text-xs text-[#8a8a8a] uppercase tracking-widest mt-1">Annual Transfers</div>
          </div>
        </div>

        {/* Transfer Reasons */}
        <div>
          <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest mb-3 border-b border-[#e5e5e0] pb-2">
            Transfer Reasons
          </div>
          <HorizontalBarChart data={reasonData} />
        </div>

        {/* Destinations */}
        <div>
          <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest mb-3 border-b border-[#e5e5e0] pb-2">
            Where They Go
          </div>
          <HorizontalBarChart data={destinationData} />
        </div>

        {/* SSES Advantage */}
        <div className="border-2 border-[#00cc66] bg-[#f5f5f0]">
          <div className="border-b border-[#00cc66] px-4 py-2 bg-[#00cc66]">
            <span className="font-mono text-[10px] text-white uppercase tracking-widest">SSES Competitive Advantage</span>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="font-mono text-xl line-through text-[#8a8a8a]">
                  ${metrics.ssesAdvantage.imgTuition.toLocaleString()}
                </div>
                <div className="font-mono text-[10px] text-[#8a8a8a] uppercase">IMG Tuition</div>
              </div>
              <div>
                <div className="font-mono text-xl font-bold text-[#00cc66]">
                  ${metrics.ssesAdvantage.ssesTuition.toLocaleString()}
                </div>
                <div className="font-mono text-[10px] text-[#8a8a8a] uppercase">SSES Tuition</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#e5e5e0] text-center">
              <div className="font-mono text-3xl font-bold text-[#00cc66]">
                ${metrics.ssesAdvantage.tuitionSavings.toLocaleString()}
              </div>
              <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest">Annual Savings</div>
            </div>
          </div>
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
    { label: 'Montessori', value: metrics.schoolTypes.montessori, color: '#0066ff' },
    { label: 'Religious', value: metrics.schoolTypes.religious, color: '#9933ff' },
    { label: 'Other Private', value: metrics.schoolTypes.otherPrivate, color: '#00cc66' },
    { label: 'Public', value: metrics.schoolTypes.public, color: '#4a4a4a' }
  ];

  const budgetData = [
    { label: 'High ($40K+)', value: metrics.budgetSegments.high, color: '#ff6b00' },
    { label: 'Mid ($25-40K)', value: metrics.budgetSegments.mid, color: '#0066ff' },
    { label: 'Low (<$25K)', value: metrics.budgetSegments.low, color: '#4a4a4a' }
  ];

  return (
    <div className="border-2 border-[#0066ff] bg-white">
      <div className="border-b border-[#0066ff] px-4 py-2 bg-[#0066ff] flex items-center gap-2">
        <span className="w-2 h-2 bg-white" />
        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">K-8 Transition Analysis</span>
        <span className="font-mono text-[10px] text-white/70 ml-auto">{metrics.annualRange}</span>
      </div>

      <div className="p-6 space-y-6">
        {/* Total Graduates */}
        <div className="border-2 border-[#0a0a0a] p-6 bg-[#f5f5f0]">
          <div className="text-center">
            <div className="font-mono text-4xl font-bold text-[#0066ff]">
              {metrics.totalGraduates.min}-{metrics.totalGraduates.max}
            </div>
            <div className="font-mono text-xs text-[#8a8a8a] uppercase tracking-widest mt-1">Annual K-8 Graduates</div>
          </div>
        </div>

        {/* School Types */}
        <div>
          <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest mb-3 border-b border-[#e5e5e0] pb-2">
            Source School Types
          </div>
          <HorizontalBarChart data={schoolTypeData} />
        </div>

        {/* Budget Segments */}
        <div>
          <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest mb-3 border-b border-[#e5e5e0] pb-2">
            Budget Segments
          </div>
          <HorizontalBarChart data={budgetData} />
        </div>

        {/* SSES Captures */}
        <div className="border-2 border-[#00cc66] bg-[#f5f5f0]">
          <div className="border-b border-[#00cc66] px-4 py-2 bg-[#00cc66]">
            <span className="font-mono text-[10px] text-white uppercase tracking-widest">SSES Opportunity</span>
          </div>
          <div className="p-4 text-center">
            <div className="font-mono text-4xl font-bold text-[#00cc66]">
              {metrics.ssesCaptures.min}-{metrics.ssesCaptures.max}
            </div>
            <div className="font-mono text-xs text-[#8a8a8a] uppercase tracking-widest mt-1">Potential Captures Annually</div>
            <div className="mt-4 pt-4 border-t border-[#e5e5e0]">
              <span className="font-mono text-sm font-bold text-[#00cc66]">
                {Math.round((metrics.ssesCaptures.min / metrics.totalGraduates.min) * 100)}-
                {Math.round((metrics.ssesCaptures.max / metrics.totalGraduates.max) * 100)}%
              </span>
              <span className="font-mono text-xs text-[#8a8a8a] uppercase ml-2">capture rate potential</span>
            </div>
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
    <div className="border-2 border-[#9933ff] bg-white">
      <div className="border-b border-[#9933ff] px-4 py-2 bg-[#9933ff] flex items-center gap-2">
        <span className="w-2 h-2 bg-white" />
        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Teen Influence Analysis</span>
      </div>

      <div className="p-6 space-y-6">
        {/* Veto Power */}
        <div className="border-2 border-[#0a0a0a] p-6 bg-[#f5f5f0]">
          <div className="text-center">
            <div className="font-mono text-4xl font-bold text-[#9933ff]">
              {metrics.vetoPercentage}%+
            </div>
            <div className="font-mono text-xs text-[#8a8a8a] uppercase tracking-widest mt-1">Veto Power on Parent Decisions</div>
          </div>
        </div>

        {/* Discovery Channels */}
        <div>
          <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest mb-3 border-b border-[#e5e5e0] pb-2">
            Discovery Channels
          </div>
          <div className="grid grid-cols-2 gap-2">
            {metrics.discoveryChannels.map((channel, index) => (
              <div
                key={index}
                className="px-3 py-2 bg-[#0a0a0a] text-white font-mono text-xs text-center"
              >
                {channel}
              </div>
            ))}
          </div>
        </div>

        {/* Key Factors */}
        <div>
          <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest mb-3 border-b border-[#e5e5e0] pb-2">
            Key Decision Factors
          </div>
          <div className="space-y-2">
            {metrics.keyFactors.map((factor, index) => (
              <div
                key={index}
                className="flex items-center gap-3 border border-[#0a0a0a] px-3 py-2"
              >
                <span className="w-6 h-6 bg-[#9933ff] text-white flex items-center justify-center font-mono text-xs font-bold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-xs">{factor}</span>
              </div>
            ))}
          </div>
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

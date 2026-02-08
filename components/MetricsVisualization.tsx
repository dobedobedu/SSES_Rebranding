import React from 'react';
import { IMGTransferMetrics, K8TransitionMetrics, TeenInfluenceMetrics, ConfidenceLevel } from '../types';

// Confidence badge component
export const ConfidenceBadge: React.FC<{ confidence: ConfidenceLevel }> = ({ confidence }) => {
  const styles = {
    high: { bg: '#00cc66', text: 'HIGH' },
    medium: { bg: '#0066ff', text: 'MED' },
    low: { bg: '#ff6b00', text: 'LOW' },
    unverified: { bg: '#dc2626', text: 'UNVERIFIED' }
  };
  const style = styles[confidence];

  return (
    <span
      className="font-mono text-[8px] px-1.5 py-0.5 text-white font-bold"
      style={{ backgroundColor: style.bg }}
    >
      {style.text}
    </span>
  );
};

interface HorizontalBarChartProps {
  data: { label: string; value: number; color?: string; source?: string; confidence?: ConfidenceLevel }[];
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
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#0a0a0a] uppercase tracking-wide">{item.label}</span>
              {item.confidence && <ConfidenceBadge confidence={item.confidence} />}
            </div>
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
          {item.source && (
            <div className="font-mono text-[9px] text-[#8a8a8a] mt-0.5">{item.source}</div>
          )}
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
    { label: 'Financial', value: metrics.reasons.financial.value, color: '#ff6b00', source: metrics.reasons.financial.source.document, confidence: metrics.reasons.financial.source.confidence },
    { label: 'Athletic', value: metrics.reasons.athletic.value, color: '#0066ff', source: metrics.reasons.athletic.source.document, confidence: metrics.reasons.athletic.source.confidence },
    { label: 'Academic', value: metrics.reasons.academic.value, color: '#00cc66', source: metrics.reasons.academic.source.document, confidence: metrics.reasons.academic.source.confidence },
    { label: 'Relocation', value: metrics.reasons.relocation.value, color: '#9933ff', source: metrics.reasons.relocation.source.document, confidence: metrics.reasons.relocation.source.confidence }
  ];

  const destinationData = [
    { label: 'Private School', value: metrics.destinations.privateSchool.value, color: '#00cc66' },
    { label: 'Public School', value: metrics.destinations.publicSchool.value, color: '#0066ff' },
    { label: 'Out of State', value: metrics.destinations.outOfState.value, color: '#ff6b00' },
    { label: 'Other', value: metrics.destinations.other.value, color: '#4a4a4a' }
  ];

  return (
    <div className="border-2 border-[#ff6b00] bg-white">
      <div className="border-b border-[#ff6b00] px-4 py-2 bg-[#ff6b00] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-white" />
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">IMG Transfer Analysis</span>
        </div>
        <span className="font-mono text-[10px] text-white/70">{metrics.timeframe}</span>
      </div>

      <div className="p-6 space-y-6">
        {/* Total Transfers */}
        <div className="border-2 border-[#0a0a0a] p-6 bg-[#f5f5f0]">
          <div className="flex items-start justify-between mb-2">
            <div className="text-center flex-1">
              <div className="font-mono text-4xl font-bold text-[#ff6b00]">
                {metrics.totalTransfers.value.min}-{metrics.totalTransfers.value.max}
              </div>
              <div className="font-mono text-xs text-[#8a8a8a] uppercase tracking-widest mt-1">Annual Transfers</div>
            </div>
            <div className="text-right">
              <ConfidenceBadge confidence={metrics.totalTransfers.source.confidence} />
              <div className="font-mono text-[9px] text-[#8a8a8a] mt-1 max-w-[120px]">{metrics.totalTransfers.source.note}</div>
            </div>
          </div>
          <div className="font-mono text-[9px] text-[#8a8a8a] text-center">{metrics.totalTransfers.source.document}</div>
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
            <ConfidenceBadge confidence={metrics.ssesAdvantage.tuitionSavings.source.confidence} />
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="font-mono text-xl line-through text-[#8a8a8a]">
                  ${metrics.ssesAdvantage.imgTuition.value.toLocaleString()}
                </div>
                <div className="font-mono text-[10px] text-[#8a8a8a] uppercase">IMG Tuition</div>
              </div>
              <div>
                <div className="font-mono text-xl font-bold text-[#00cc66]">
                  ${metrics.ssesAdvantage.ssesTuition.value.toLocaleString()}
                </div>
                <div className="font-mono text-[10px] text-[#8a8a8a] uppercase">SSES Tuition</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#e5e5e0] text-center">
              <div className="font-mono text-3xl font-bold text-[#00cc66]">
                ${metrics.ssesAdvantage.tuitionSavings.value.toLocaleString()}
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
    { label: 'Montessori', value: metrics.schoolTypes.montessori.value, color: '#0066ff', confidence: metrics.schoolTypes.montessori.source.confidence },
    { label: 'Religious', value: metrics.schoolTypes.religious.value, color: '#9933ff', confidence: metrics.schoolTypes.religious.source.confidence },
    { label: 'Other Private', value: metrics.schoolTypes.otherPrivate.value, color: '#00cc66', confidence: metrics.schoolTypes.otherPrivate.source.confidence },
    { label: 'Public', value: metrics.schoolTypes.public.value, color: '#4a4a4a', confidence: metrics.schoolTypes.public.source.confidence }
  ];

  const budgetData = [
    { label: 'High ($40K+)', value: metrics.budgetSegments.high.value, color: '#ff6b00', confidence: metrics.budgetSegments.high.source.confidence },
    { label: 'Mid ($25-40K)', value: metrics.budgetSegments.mid.value, color: '#0066ff', confidence: metrics.budgetSegments.mid.source.confidence },
    { label: 'Low (<$25K)', value: metrics.budgetSegments.low.value, color: '#4a4a4a', confidence: metrics.budgetSegments.low.source.confidence }
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
          <div className="flex items-start justify-between mb-2">
            <div className="text-center flex-1">
              <div className="font-mono text-4xl font-bold text-[#0066ff]">
                {metrics.totalGraduates.value.min}-{metrics.totalGraduates.value.max}
              </div>
              <div className="font-mono text-xs text-[#8a8a8a] uppercase tracking-widest mt-1">Annual K-8 Graduates</div>
            </div>
            <div className="text-right">
              <ConfidenceBadge confidence={metrics.totalGraduates.source.confidence} />
            </div>
          </div>
          <div className="font-mono text-[9px] text-[#8a8a8a] text-center">{metrics.totalGraduates.source.document}</div>
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
          <div className="border-b border-[#00cc66] px-4 py-2 bg-[#00cc66] flex items-center justify-between">
            <span className="font-mono text-[10px] text-white uppercase tracking-widest">SSES Opportunity</span>
            <ConfidenceBadge confidence={metrics.ssesCaptures.source.confidence} />
          </div>
          <div className="p-4 text-center">
            <div className="font-mono text-4xl font-bold text-[#00cc66]">
              {metrics.ssesCaptures.value.min}-{metrics.ssesCaptures.value.max}
            </div>
            <div className="font-mono text-xs text-[#8a8a8a] uppercase tracking-widest mt-1">Potential Captures Annually</div>
            <div className="mt-4 pt-4 border-t border-[#e5e5e0]">
              <span className="font-mono text-sm font-bold text-[#00cc66]">
                {Math.round((metrics.ssesCaptures.value.min / metrics.totalGraduates.value.min) * 100)}-
                {Math.round((metrics.ssesCaptures.value.max / metrics.totalGraduates.value.max) * 100)}%
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
  const isUnverified = metrics.vetoPercentage.source.confidence === 'unverified';

  return (
    <div className={`border-2 ${isUnverified ? 'border-[#dc2626]' : 'border-[#9933ff]'} bg-white`}>
      <div className={`border-b ${isUnverified ? 'border-[#dc2626] bg-[#dc2626]' : 'border-[#9933ff] bg-[#9933ff]'} px-4 py-2 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-white" />
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Teen Influence Analysis</span>
        </div>
        <ConfidenceBadge confidence={metrics.vetoPercentage.source.confidence} />
      </div>

      {isUnverified && (
        <div className="bg-[#fef2f2] border-b border-[#fecaca] px-4 py-3">
          <div className="flex items-start gap-2">
            <span className="text-[#dc2626] font-bold">⚠️</span>
            <div>
              <div className="font-mono text-xs font-bold text-[#dc2626]">DATA NOT VERIFIED</div>
              <div className="font-mono text-[10px] text-[#7f1d1d]">{metrics.vetoPercentage.source.note}</div>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 space-y-6">
        {/* Veto Power */}
        <div className="border-2 border-[#0a0a0a] p-6 bg-[#f5f5f0]">
          <div className="text-center">
            <div className={`font-mono text-4xl font-bold ${isUnverified ? 'text-[#dc2626]' : 'text-[#9933ff]'}`}>
              {metrics.vetoPercentage.value}%+
            </div>
            <div className="font-mono text-xs text-[#8a8a8a] uppercase tracking-widest mt-1">Veto Power on Parent Decisions</div>
          </div>
        </div>

        {/* Discovery Channels */}
        <div>
          <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest mb-3 border-b border-[#e5e5e0] pb-2">
            Discovery Channels
          </div>
          <div className="grid grid-cols-2 gap-1">
            {metrics.discoveryChannels.map((channel, index) => (
              <div key={index} className="px-3 py-2 bg-[#0a0a0a] text-white font-mono text-xs text-center">
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
  TeenInfluenceVisualization,
  ConfidenceBadge
};

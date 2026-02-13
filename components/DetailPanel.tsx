import React from 'react';
import { Persona, MatrixColumn, COLUMNS } from '../types';
import { ChevronLeft, ChevronRight, X, MapPin, DollarSign, Trophy, Zap, Route } from 'lucide-react';
import { IMGTransferVisualization, K8TransitionVisualization, TeenInfluenceVisualization } from './MetricsVisualization';

interface DetailPanelProps {
  persona: Persona;
  colIndex: MatrixColumn;
  isOpen: boolean;
  selectedTactics: Set<string>;
  onToggleTactic: (tacticId: string) => void;
  onClose: () => void;
  onNavigate: (direction: 'left' | 'right') => void;
  onOpenTouchPointModal: (persona: Persona) => void;
}

const DetailPanel: React.FC<DetailPanelProps> = ({
  persona,
  colIndex,
  isOpen,
  onClose,
  onNavigate,
  onOpenTouchPointModal
}) => {
  const getPriorityColor = () => {
    switch (persona.priorityType) {
      case 'img-switcher': return '#2D8F6F';
      case 'bridge-crosser': return '#0066ff';
      case 'teen-driver': return '#9933ff';
      default: return '#0a0a0a';
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#0a0a0a]/80 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div className={`
        fixed bottom-0 left-0 right-0 z-50 bg-[#fafafa]
        transition-transform duration-300 ease-in-out border-t-2 border-[#0a0a0a]
        h-[80vh] overflow-hidden flex flex-col
        ${isOpen ? 'translate-y-0' : 'translate-y-full'}
      `}>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate('left'); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-[#0a0a0a] hover:bg-[#2a2a2a] border-2 border-[#0a0a0a] z-[60] group transition-all"
          aria-label="Previous Column"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover:text-[#2D8F6F] transition-colors" />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onNavigate('right'); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-[#0a0a0a] hover:bg-[#2a2a2a] border-2 border-[#0a0a0a] z-[60] group transition-all"
          aria-label="Next Column"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:text-[#2D8F6F] transition-colors" />
        </button>

        {/* Header */}
        <div className="px-6 py-4 border-b-2 border-[#0a0a0a] flex items-center justify-between bg-[#0a0a0a] text-white relative">
          <div className="flex items-center gap-4">
            <div className="w-1 h-10" style={{ backgroundColor: getPriorityColor() }} />
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-[10px] font-bold px-2 py-1 uppercase tracking-wider text-white"
                  style={{ backgroundColor: getPriorityColor() }}
                >
                  {COLUMNS[colIndex]}
                </span>
                <h2 className="font-mono text-lg font-bold uppercase tracking-wide">{persona.name}</h2>
              </div>
              <p className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest mt-1">
                Persona Strategy Matrix
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 border-2 border-white hover:bg-white hover:text-[#0a0a0a] transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 bg-[#f5f5f0]">
          <div className="max-w-6xl mx-auto">
            <ContentRenderer
              persona={persona}
              colIndex={colIndex}
              onOpenTouchPointModal={onOpenTouchPointModal}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const ContentRenderer: React.FC<{
  persona: Persona;
  colIndex: MatrixColumn;
  onOpenTouchPointModal: (persona: Persona) => void;
}> = ({ persona, colIndex, onOpenTouchPointModal }) => {

  switch (colIndex) {
    case MatrixColumn.SEGMENT:
      return (
        <div className="space-y-6">
          {/* Research Metrics Visualizations for Priority Segments */}
          {persona.imgTransferMetrics && (
            <IMGTransferVisualization metrics={persona.imgTransferMetrics} />
          )}

          {persona.k8TransitionMetrics && (
            <K8TransitionVisualization metrics={persona.k8TransitionMetrics} />
          )}

          {persona.teenInfluenceMetrics && (
            <TeenInfluenceVisualization metrics={persona.teenInfluenceMetrics} />
          )}

          {/* Journey Map Section */}
          <div className="border-2 border-[#0a0a0a] bg-white">
            <div className="border-b border-[#0a0a0a] px-6 py-3 bg-[#0a0a0a]">
              <div className="flex items-center gap-3">
                <Route className="w-5 h-5 text-[#2D8F6F]" />
                <span className="font-mono text-sm font-bold text-white uppercase tracking-wider">Journey Map</span>
                <span className="font-mono text-[10px] text-[#8a8a8a]">
                  {persona.touchPoints?.length || 0} touch points
                </span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-[#4a4a4a] mb-6">
                This persona has {persona.touchPoints?.length || 0} touch points with detailed actions,
                partner information, and progressive disclosure of data.
              </p>
              <button
                onClick={() => onOpenTouchPointModal(persona)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#2D8F6F] text-white border-2 border-[#2D8F6F] font-mono text-xs uppercase tracking-wider hover:bg-white hover:text-[#2D8F6F] transition-all"
              >
                Explore full journey map
                <span>→</span>
              </button>

              {/* Touch Point Grid */}
              {persona.touchPoints && persona.touchPoints.length > 0 && (
                <div className="mt-8 grid gap-px bg-[#0a0a0a] border-2 border-[#0a0a0a]">
                  <div className="bg-[#f0f0eb] px-4 py-2">
                    <span className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest">
                      Touch Points Overview
                    </span>
                  </div>
                  <div className={`grid ${persona.touchPoints.length <= 3 ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
                    {persona.touchPoints.map((tp, i) => (
                      <div key={i} className="bg-white p-4 border-r border-b border-[#e5e5e0]">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="w-6 h-6 flex items-center justify-center font-mono text-xs font-bold text-white bg-[#0a0a0a]"
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <h4 className="font-mono text-xs font-bold uppercase tracking-wide truncate">{tp.title}</h4>
                        </div>
                        <p className="text-xs text-[#4a4a4a] mb-2">{tp.subtitle}</p>
                        <p className="font-mono text-[10px] text-[#8a8a8a]">{tp.actions.length} actions</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );

    case MatrixColumn.LOCATION:
      return (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <section className="border-2 border-[#0a0a0a] bg-white">
              <div className="border-b border-[#0a0a0a] px-4 py-2 bg-[#0a0a0a] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2D8F6F]" />
                <span className="font-mono text-[10px] text-white uppercase tracking-widest">Concrete Expectations</span>
              </div>
              <div className="divide-y divide-[#e5e5e0]">
                {persona.location.expecting.map((item, i) => (
                  <div key={i} className="px-4 py-3 font-mono text-sm hover:bg-[#f5f5f0] transition-colors">
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="border-2 border-[#0a0a0a] bg-white">
              <div className="border-b border-[#0a0a0a] px-4 py-2 bg-[#f0f0eb]">
                <span className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest">Cultural Baseline (Used To)</span>
              </div>
              <div className="p-4 flex flex-wrap gap-2">
                {persona.location.usedTo.map((item, i) => (
                  <span key={i} className="px-3 py-1.5 bg-[#0a0a0a] text-white font-mono text-xs">
                    {item}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className="border-2 border-[#2D8F6F] bg-white">
              <div className="border-b border-[#2D8F6F] px-4 py-2 bg-[#2D8F6F]">
                <span className="font-mono text-[10px] text-white uppercase tracking-widest">Emotional Anchor</span>
              </div>
              <div className="p-6">
                <p className="text-lg font-bold text-[#0a0a0a] leading-snug">
                  {persona.location.emotionalDrivers}
                </p>
              </div>
            </div>

            <div className="border-2 border-[#0a0a0a] bg-[#2D8F6F]">
              <div className="border-b border-[#0a0a0a] px-4 py-2">
                <span className="font-mono text-[10px] text-white uppercase tracking-widest">Golden Nuggets</span>
              </div>
              <div className="p-4 space-y-3">
                {persona.location.nuggets.map((n, i) => (
                  <div key={i} className="flex gap-2 text-white text-sm">
                    <span className="font-mono text-lg font-bold">"</span>
                    <span>{n}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case MatrixColumn.SPENDING:
      return (
        <div className="grid md:grid-cols-[1fr_320px] gap-6">
          <div className="border-2 border-[#0a0a0a] bg-white">
            <div className="border-b border-[#0a0a0a] px-4 py-2 bg-[#0a0a0a] flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#00cc66]" />
              <span className="font-mono text-[10px] text-white uppercase tracking-widest">Spend Allocation Checklist</span>
            </div>
            <div className="max-h-[400px] overflow-y-auto divide-y divide-[#e5e5e0]">
              {persona.spending.ticketItems.map((item, i) => (
                <div key={i} className="px-4 py-4 flex justify-between items-center hover:bg-[#f5f5f0] transition-colors">
                  <span className="font-bold text-sm">{item.item}</span>
                  <span className="font-mono text-sm font-bold text-[#00cc66]">{item.priceRange}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="border-2 border-[#0a0a0a] bg-white p-6">
              <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest mb-2">
                Annual Academic Target
              </div>
              <div className="font-mono text-3xl font-bold">{persona.spending.budgetRange}</div>

              <div className="mt-6 pt-4 border-t border-[#e5e5e0]">
                <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest mb-3">
                  Sensitivity Matrix
                </div>
                <div className="bg-[#0a0a0a] text-white p-4 font-bold text-center text-sm">
                  {persona.spending.sensitivity}
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case MatrixColumn.COMPETITION:
      return (
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-[#0a0a0a]" />
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider">Competitive Benchmarking</h3>
            <Trophy className="w-5 h-5 text-[#2D8F6F]" />
          </div>

          <div className="border-2 border-[#0a0a0a]">
            <div className="bg-[#0a0a0a] px-4 py-2 flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest">Competitors</span>
              <span className="font-mono text-[10px] text-[#8a8a8a]">{persona.competition.schools.length} Schools</span>
            </div>
            <div className="divide-y divide-[#e5e5e0]">
              {persona.competition.schools.map((school, i) => (
                <div key={i} className="grid md:grid-cols-[1fr_240px]">
                  <div className="p-4 md:p-6 border-r border-[#e5e5e0]">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-[#0a0a0a] text-white flex items-center justify-center font-mono text-sm font-bold">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h4 className="font-bold text-lg uppercase tracking-wide">{school.name}</h4>
                    </div>
                    <div className="bg-[#f5f5f0] p-4 border-l-2 border-[#2D8F6F]">
                      <p className="text-sm text-[#4a4a4a]">"{school.reason}"</p>
                    </div>
                  </div>
                  <div className="p-4 bg-[#f0f0eb]">
                    <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest mb-2">
                      Referral Ecosystem
                    </div>
                    <div className="font-bold text-sm">{school.recommendationSource}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case MatrixColumn.STRATEGY:
      return (
        <div className="max-w-4xl mx-auto">
          <div className="border-2 border-[#0a0a0a] bg-[#0a0a0a] text-white overflow-hidden">
            <div className="border-b border-[#2a2a2a] px-6 py-4 flex items-center gap-3">
              <Zap className="w-5 h-5 text-[#2D8F6F]" />
              <span className="font-mono text-[10px] text-[#2D8F6F] uppercase tracking-widest">2026 Strategic Blueprint</span>
            </div>

            <div className="p-8 md:p-12">
              <p className="text-xl md:text-2xl font-light leading-relaxed text-white/90">
                {persona.strategy}
              </p>
            </div>

            <div className="grid grid-cols-2 border-t border-[#2a2a2a]">
              <div className="p-6 border-r border-[#2a2a2a]">
                <span className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest block mb-2">
                  Primary Objective
                </span>
                <span className="font-mono text-lg font-bold text-white">Segment Capture</span>
              </div>
              <div className="p-6">
                <span className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest block mb-2">
                  Success Metric
                </span>
                <span className="font-mono text-lg font-bold text-white">Conversion ROI</span>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default DetailPanel;

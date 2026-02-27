import React, { useState } from 'react';
import { Persona, MatrixColumn, COLUMNS } from '../types';
import { ChevronLeft, ChevronRight, X, MapPin, DollarSign, Trophy, Zap, Route, Check, Target, Building2, Users, Globe, Lightbulb, Heart, Sparkles } from 'lucide-react';

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
  const [activeTouchPointIndex, setActiveTouchPointIndex] = useState(0);
  const [selectedActions, setSelectedActions] = useState<Set<string>>(new Set());

  const getPriorityColor = () => {
    switch (persona.priorityType) {
      case 'img-switcher':
        return '#2D8F6F';
      case 'bridge-crosser':
        return '#0066ff';
      case 'teen-driver':
        return '#9933ff';
      default:
        return '#0a0a0a';
    }
  };

  const touchPoints = persona.touchPoints || [];
  const activeTouchPoint = touchPoints[activeTouchPointIndex] || touchPoints[0];

  const getTouchPointIcon = (index: number) => {
    const icons = [Building2, Users, Globe, Lightbulb, Trophy, Heart, Sparkles];
    const Icon = icons[index % icons.length];
    return <Icon className="w-4 h-4" />;
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'immediate':
        return 'bg-[#2D8F6F] text-white';
      case 'short-term':
        return 'bg-[#0066ff] text-white';
      case 'long-term':
        return 'bg-[#4a4a4a] text-white';
      default:
        return 'bg-[#e5e5e0] text-[#4a4a4a]';
    }
  };

  const toggleAction = (actionId: string) => {
    setSelectedActions(prev => {
      const next = new Set(prev);
      if (next.has(actionId)) {
        next.delete(actionId);
      } else {
        next.add(actionId);
      }
      return next;
    });
  };

  const nextTouchPoint = () => {
    if (activeTouchPointIndex < touchPoints.length - 1) {
      setActiveTouchPointIndex(prev => prev + 1);
    }
  };

  const prevTouchPoint = () => {
    if (activeTouchPointIndex > 0) {
      setActiveTouchPointIndex(prev => prev - 1);
    }
  };

  // Render content based on active column - defined INSIDE DetailPanel
  const renderContent = () => {
    switch (colIndex) {
      case MatrixColumn.SEGMENT:
        return (
          <div className="space-y-6">
            {touchPoints.length > 0 && (
              <div className="border-2 border-[#0a0a0a] bg-white">
                <div className="border-b border-[#0a0a0a] px-6 py-3 bg-[#0a0a0a] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Route className="w-5 h-5 text-[#2D8F6F]" />
                    <span className="font-mono text-sm font-bold text-white uppercase tracking-wider">Journey Map</span>
                    <span className="font-mono text-[10px] text-[#8a8a8a]">
                      {activeTouchPointIndex + 1} / {touchPoints.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevTouchPoint}
                      disabled={activeTouchPointIndex === 0}
                      className={`px-3 py-1 font-mono text-xs uppercase tracking-wider border transition-all ${
                        activeTouchPointIndex === 0
                          ? 'border-[#4a4a4a] text-[#4a4a4a] cursor-not-allowed'
                          : 'border-white text-white hover:bg-white hover:text-[#0a0a0a]'
                      }`}
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={nextTouchPoint}
                      disabled={activeTouchPointIndex === touchPoints.length - 1}
                      className={`px-3 py-1 font-mono text-xs uppercase tracking-wider border transition-all ${
                        activeTouchPointIndex === touchPoints.length - 1
                          ? 'border-[#4a4a4a] text-[#4a4a4a] cursor-not-allowed'
                          : 'border-white text-white hover:bg-white hover:text-[#0a0a0a]'
                      }`}
                    >
                      Next →
                    </button>
                  </div>
                </div>
                <div className="px-6 py-4 bg-[#f5f5f0] border-b border-[#0a0a0a]">
                  <div className="flex items-center justify-center gap-2">
                    {touchPoints.map((tp, index) => (
                      <React.Fragment key={tp.id}>
                        <button
                          onClick={() => setActiveTouchPointIndex(index)}
                          className={`w-8 h-8 flex items-center justify-center font-mono text-xs font-bold transition-all border-2 ${
                            index === activeTouchPointIndex
                              ? 'bg-[#2D8F6F] border-[#2D8F6F] text-white'
                              : index < activeTouchPointIndex
                              ? 'bg-[#2D8F6F]/20 border-[#2D8F6F] text-[#2D8F6F]'
                              : 'bg-white border-[#0a0a0a] text-[#8a8a8a]'
                          }`}
                        >
                          {index < activeTouchPointIndex ? <Check className="w-4 h-4" /> : String(index + 1)}
                        </button>
                        {index < touchPoints.length - 1 && (
                          <div className={`w-8 h-0.5 ${index < activeTouchPointIndex ? 'bg-[#2D8F6F]' : 'bg-[#e5e5e0]'}`} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/2 p-6 border-r border-[#e5e5e0]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-[#0a0a0a] text-white">
                        {getTouchPointIcon(activeTouchPointIndex)}
                      </div>
                      <span className="font-mono text-[10px] text-[#8a8a8a] uppercase">
                        Touch Point {activeTouchPointIndex + 1}
                      </span>
                    </div>
                    <h3 className="font-mono text-lg font-bold uppercase mb-2">{activeTouchPoint?.title}</h3>
                    <p className="font-mono text-sm text-[#2D8F6F] mb-4">{activeTouchPoint?.subtitle}</p>
                    <p className="text-sm text-[#4a4a4a] mb-6 leading-relaxed">
                      {activeTouchPoint?.description}
                    </p>
                    <div className="border-t border-[#e5e5e0] pt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="w-4 h-4 text-[#2D8F6F]" />
                        <span className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest">Recommended Actions</span>
                      </div>
                      <div className="space-y-2">
                        {activeTouchPoint?.actions.map((action) => (
                          <label key={action.id} className="flex items-start gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={selectedActions.has(action.id)}
                              onChange={() => toggleAction(action.id)}
                              className="mt-1 w-4 h-4 accent-[#2D8F6F]"
                            />
                            <span className={`text-sm flex-1 ${selectedActions.has(action.id) ? 'line-through text-[#8a8a8a]' : 'text-[#0a0a0a]'}`}>
                              {action.text}
                            </span>
                            <span className={`font-mono text-[9px] px-2 py-0.5 ${getPriorityBadgeColor(action.priority)}`}>
                              {action.priority}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 p-6 bg-[#fafafa]">
                    <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest mb-4">
                      Data & Insights
                    </div>
                    {activeTouchPoint?.rightPanelType === 'companies' && activeTouchPoint?.rightPanelData?.tier1 && (
                      <div className="space-y-4">
                        {activeTouchPoint.rightPanelData.tier1.slice(0, 3).map((company: any, i: number) => (
                          <div key={i} className="border border-[#0a0a0a] p-3 bg-white">
                            <div className="font-bold text-sm mb-1">{company.name}</div>
                            <div className="font-mono text-[10px] text-[#8a8a8a]">{company.jobs}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {activeTouchPoint?.rightPanelType === 'partners' && activeTouchPoint?.rightPanelData?.categories && (
                      <div className="space-y-3">
                        {activeTouchPoint.rightPanelData.categories.slice(0, 2).map((cat: any, i: number) => (
                          <div key={i} className="border border-[#0a0a0a] p-3 bg-white">
                            <div className="font-bold text-sm mb-1">{cat.title}</div>
                            <div className="font-mono text-[10px] text-[#8a8a8a]">{cat.items?.slice(0, 2).join(', ')}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {activeTouchPoint?.rightPanelType === 'digital' && activeTouchPoint?.rightPanelData?.channels && (
                      <div className="space-y-2">
                        {activeTouchPoint.rightPanelData.channels.slice(0, 4).map((channel: string, i: number) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#2D8F6F]" />
                            <span className="font-mono text-xs">{channel}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {activeTouchPoint?.rightPanelType === 'validation' && activeTouchPoint?.rightPanelData?.proofPoints && (
                      <div className="space-y-2">
                        {activeTouchPoint.rightPanelData.proofPoints.slice(0, 3).map((proof: string, i: number) => (
                          <div key={i} className="flex items-center gap-2">
                            <Check className="w-3 h-3 text-[#2D8F6F]" />
                            <span className="text-xs">{proof}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {activeTouchPoint?.rightPanelType === 'social' && activeTouchPoint?.rightPanelData?.testimonials && (
                      <div className="space-y-3">
                        {activeTouchPoint.rightPanelData.testimonials.slice(0, 2).map((t: any, i: number) => (
                          <div key={i} className="border border-[#0a0a0a] p-3 bg-white">
                            <div className="font-bold text-sm">{t.family}</div>
                            <div className="font-mono text-[10px] text-[#8a8a8a]">{t.from}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="border-t border-[#0a0a0a] px-6 py-3 bg-[#0a0a0a]">
                  <button onClick={() => onNavigate('right')} className="w-full flex items-center justify-center gap-2 text-white hover:text-[#2D8F6F] transition-colors">
                    <span className="font-mono text-xs uppercase tracking-wider">Continue to Location</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
            {touchPoints.length === 0 && (
              <div className="border-2 border-[#0a0a0a] bg-white p-6">
                <p className="text-sm text-[#4a4a4a]">No journey map available for this segment.</p>
              </div>
            )}
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
                <span className="font-mono text-[10px] text-[#2D8F6F] uppercase tracking-widest">Strategic Value to SSES</span>
              </div>
              <div className="p-8 md:p-12">
                <p className="text-lg md:text-xl font-light leading-relaxed text-white/90">
                  {persona.strategy}
                </p>
              </div>
              <div className="grid grid-cols-2 border-t border-[#2a2a2a]">
                <div className="p-6 border-r border-[#2a2a2a]">
                  <span className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest block mb-2">
                    Key Contribution
                  </span>
                  <span className="font-mono text-lg font-bold text-white">Community Diversity</span>
                </div>
                <div className="p-6">
                  <span className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest block mb-2">
                    Long-term Impact
                  </span>
                  <span className="font-mono text-lg font-bold text-white">Enrollment Stability</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#0a0a0a]/80 z-40 transition-opacity backdrop-blur-sm" onClick={onClose} />
      )}

      {/* Panel */}
      <div
        className={`fixed bottom-0 md:bottom-8 left-1/2 w-full max-w-[96vw] xl:max-w-7xl z-50 bg-[#fafafa] transition-all duration-300 ease-in-out border-2 border-[#0a0a0a] border-b-0 md:border-b-2 h-[85vh] md:h-[80vh] flex flex-col`}
        style={{
          transform: isOpen ? 'translate(-50%, 0)' : 'translate(-50%, 120%)',
          boxShadow: '8px 8px 0 #0a0a0a'
        }}
      >
        {/* Navigation Arrows - Middle Y Position */}
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate('left'); }}
          disabled={colIndex === MatrixColumn.SEGMENT}
          className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 border-2 z-[60] transition-all ${
            colIndex === MatrixColumn.SEGMENT
              ? 'border-[#e5e5e0] opacity-30 cursor-not-allowed bg-white'
              : 'bg-white border-[#0a0a0a] hover:bg-[#2D8F6F] hover:border-[#2D8F6F] shadow-[4px_4px_0_#0a0a0a]'
          }`}
          aria-label="Previous Column"
        >
          <ChevronLeft className={`w-6 h-6 ${colIndex === MatrixColumn.SEGMENT ? 'text-[#8a8a8a]' : 'text-[#0a0a0a] group-hover:text-white'}`} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate('right'); }}
          disabled={colIndex === MatrixColumn.STRATEGY}
          className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 border-2 z-[60] transition-all ${
            colIndex === MatrixColumn.STRATEGY
              ? 'border-[#e5e5e0] opacity-30 cursor-not-allowed bg-white'
              : 'bg-white border-[#0a0a0a] hover:bg-[#2D8F6F] hover:border-[#2D8F6F] shadow-[4px_4px_0_#0a0a0a]'
          }`}
          aria-label="Next Column"
        >
          <ChevronRight className={`w-6 h-6 ${colIndex === MatrixColumn.STRATEGY ? 'text-[#8a8a8a]' : 'text-[#0a0a0a] group-hover:text-white'}`} />
        </button>

        {/* Header with Horizontal Tab Navigation */}
        <div className="px-6 md:px-10 py-5 border-b-2 border-[#0a0a0a] bg-[#0a0a0a]">
          {/* Tab Navigation Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {[
                { key: MatrixColumn.SEGMENT, label: persona.name },
                { key: MatrixColumn.LOCATION, label: 'Location' },
                { key: MatrixColumn.SPENDING, label: 'Budget' },
                { key: MatrixColumn.COMPETITION, label: 'Competition' },
                { key: MatrixColumn.STRATEGY, label: 'Strategy' }
              ].map((tab, idx) => (
                <React.Fragment key={tab.key}>
                  <button
                    onClick={() => {
                      if (tab.key !== colIndex) {
                        onNavigate(tab.key > colIndex ? 'right' : 'left');
                      }
                    }}
                    className={`px-5 py-2.5 font-mono text-xs uppercase tracking-wider border-2 transition-all whitespace-nowrap ${
                      colIndex === tab.key
                        ? 'border-[#2D8F6F] bg-[#2D8F6F] text-white shadow-[4px_4px_0_#fff]'
                        : 'border-transparent text-[#8a8a8a] hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                  {idx < 4 && <span className="text-[#4a4a4a] mx-2 hidden md:inline">|</span>}
                </React.Fragment>
              ))}
            </div>
            <button onClick={onClose} className="p-2 border-2 border-transparent hover:border-[#4a4a4a] text-white transition-all ml-4 shrink-0">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 bg-[#f5f5f0]">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPanel;

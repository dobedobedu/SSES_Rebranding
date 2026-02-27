import React, { useState } from 'react';
import { Persona, MatrixColumn, COLUMNS } from '../types';
import { ChevronLeft, ChevronRight, X, MapPin, DollarSign, Trophy, Zap, Route, Check, Target, Building2, Users, Globe, Lightbulb, Heart, Sparkles, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface DetailPanelProps {
  persona: Persona;
  colIndex: MatrixColumn;
  isOpen: boolean;
  selectedTactics: Set<string>;
  onToggleTactic: (tacticId: string) => void;
  onClose: () => void;
  onNavigate: (direction: 'left' | 'right') => void;
}

const GLOBAL_BASELINE = [
  'Same-day teacher responsiveness',
  'Weekly performance PDFs',
  'Rigid academic tracking',
  'Elite metro networking',
  'Maker spaces as campus heart',
  'Async learning tools',
  'Outdoor classrooms',
  'Entrepreneurial peer groups',
  'Professional sports coaching',
  'International dorm life',
  'Sport-first identity',
  '$91K+ tuition',
  'Small community "safe" vibes',
  'Parent volunteer heavy',
  'Intimate teacher relationships',
  'Minimal facility variety',
  'Digital agency',
  'Self-directed interests',
  'Social media validation',
  'Respectful dialogue with adults'
];

const DetailPanel: React.FC<DetailPanelProps> = ({
  persona,
  colIndex,
  isOpen,
  onClose,
  onNavigate
}) => {
  const [activeTouchPointIndex, setActiveTouchPointIndex] = useState(0);
  const [selectedActions, setSelectedActions] = useState<Set<string>>(new Set());
  const [expandedBullets, setExpandedBullets] = useState<Set<number>>(new Set());

  const touchPoints = persona.touchPoints || [];
  const activeTouchPoint = touchPoints[activeTouchPointIndex] || touchPoints[0];

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'immediate': return 'bg-[#2D8F6F] text-white';
      case 'short-term': return 'bg-[#0066ff] text-white';
      case 'long-term': return 'bg-[#4a4a4a] text-white';
      default: return 'bg-[#e5e5e0] text-[#4a4a4a]';
    }
  };

  const toggleAction = (actionId: string) => {
    setSelectedActions(prev => {
      const next = new Set(prev);
      if (next.has(actionId)) next.delete(actionId);
      else next.add(actionId);
      return next;
    });
  };

  const toggleBullet = (index: number) => {
    setExpandedBullets(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const nextTouchPoint = () => {
    if (activeTouchPointIndex < touchPoints.length - 1) setActiveTouchPointIndex(prev => prev + 1);
  };

  const prevTouchPoint = () => {
    if (activeTouchPointIndex > 0) setActiveTouchPointIndex(prev => prev - 1);
  };

  const renderContent = () => {
    switch (colIndex) {
      case MatrixColumn.SEGMENT:
        return (
          <div className="space-y-0">
            {/* Journey Map Chrome-style Folder Tabs (Green Theme) */}
            <div className="flex items-end justify-center">
              <button 
                onClick={prevTouchPoint}
                disabled={activeTouchPointIndex === 0}
                className="mb-0.5 p-2 bg-white border-2 border-[#0a0a0a] border-b-0 hover:bg-[#f5f5f0] disabled:opacity-30 transition-all mr-1"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex items-end gap-[1px]">
                {touchPoints.map((tp, index) => (
                  <button
                    key={tp.id}
                    onClick={() => setActiveTouchPointIndex(index)}
                    className={`px-8 py-2.5 font-mono text-xs font-bold transition-all border-2 border-[#0a0a0a] border-b-0 relative ${
                      index === activeTouchPointIndex
                        ? 'bg-[#2D8F6F] text-white z-10 h-12 pt-3'
                        : 'bg-[#2D8F6F]/10 text-[#2D8F6F] h-10 hover:bg-[#2D8F6F]/20'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </button>
                ))}
              </div>

              <button 
                onClick={nextTouchPoint}
                disabled={activeTouchPointIndex === touchPoints.length - 1}
                className="mb-0.5 p-2 bg-white border-2 border-[#0a0a0a] border-b-0 hover:bg-[#f5f5f0] disabled:opacity-30 transition-all ml-1"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Journey Content Card */}
            <div className="border-2 border-[#0a0a0a] bg-white shadow-[8px_8px_0_#0a0a0a] overflow-hidden relative z-0">
              <div className="bg-[#2D8F6F] text-white px-8 py-4 border-b-2 border-[#0a0a0a] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Route className="w-5 h-5 text-white" />
                  <span className="font-mono text-sm font-bold uppercase tracking-wider">{activeTouchPoint?.title}</span>
                </div>
                <span className="font-mono text-[10px] text-white/70 uppercase tracking-widest">{activeTouchPoint?.subtitle}</span>
              </div>
              
              <div className="flex flex-col md:flex-row divide-y-2 md:divide-y-0 md:divide-x-2 divide-[#0a0a0a]">
                <div className="md:w-3/5 p-10">
                  <p className="text-xl text-[#0a0a0a] mb-10 leading-relaxed font-medium italic">"{activeTouchPoint?.description}"</p>
                  
                  <div className="border-t-2 border-[#0a0a0a] pt-8">
                    <div className="flex items-center gap-3 mb-6">
                      <Target className="w-5 h-5 text-[#2D8F6F]" />
                      <span className="font-mono text-xs font-bold uppercase tracking-widest">Recommended Tactics</span>
                    </div>
                    <div className="space-y-3">
                      {activeTouchPoint?.actions.map((action) => (
                        <label key={action.id} className="flex items-start gap-4 cursor-pointer p-3 hover:bg-[#f5f5f0] transition-all border border-transparent hover:border-[#e5e5e0]">
                          <input
                            type="checkbox"
                            checked={selectedActions.has(action.id)}
                            onChange={() => toggleAction(action.id)}
                            className="mt-1 w-5 h-5 accent-[#2D8F6F]"
                          />
                          <span className={`text-base flex-1 ${selectedActions.has(action.id) ? 'line-through text-[#8a8a8a]' : 'text-[#0a0a0a] font-medium'}`}>{action.text}</span>
                          <span className={`font-mono text-[9px] px-2 py-0.5 uppercase font-bold ${getPriorityBadgeColor(action.priority)}`}>{action.priority}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:w-2/5 p-10 bg-[#f9f9f7]">
                  <h4 className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-[0.2em] mb-6 pb-2 border-b border-[#e5e5e0]">Market Signals</h4>
                  <div className="space-y-6">
                    {activeTouchPoint?.rightPanelType === 'companies' && activeTouchPoint?.rightPanelData?.tier1 && (
                      activeTouchPoint.rightPanelData.tier1.slice(0, 3).map((company: any, i: number) => (
                        <div key={i} className="border-2 border-[#0a0a0a] p-4 bg-white shadow-[4px_4px_0_#0a0a0a]">
                          <div className="font-bold text-base mb-1">{company.name}</div>
                          <div className="font-mono text-xs text-[#2D8F6F] font-bold">{company.jobs}</div>
                        </div>
                      ))
                    )}
                    {activeTouchPoint?.rightPanelType === 'digital' && activeTouchPoint?.rightPanelData?.channels && (
                      <div className="grid grid-cols-1 gap-2">
                        {activeTouchPoint.rightPanelData.channels.map((channel: string, i: number) => (
                          <div key={i} className="flex items-center gap-3 bg-white p-3 border border-[#e5e5e0]">
                            <div className="w-2 h-2 bg-[#2D8F6F]" />
                            <span className="font-mono text-[10px] font-bold uppercase">{channel}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case MatrixColumn.LOCATION:
        return (
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Expectations - Stripped containers */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-[#2D8F6F]" />
                <h3 className="font-mono text-xl font-bold uppercase tracking-tight">Concrete Expectations</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {persona.location.expecting.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 py-2 border-b border-[#e5e5e0]">
                    <div className="w-2 h-2 bg-[#2D8F6F] shrink-0" />
                    <span className="font-bold text-base text-[#0a0a0a]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cultural Baseline */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Building2 className="w-6 h-6 text-[#0a0a0a]" />
                <h3 className="font-mono text-xl font-bold uppercase tracking-tight">Global Cultural Baseline</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {GLOBAL_BASELINE.map((item, i) => {
                  const isRelevant = persona.location.usedTo.includes(item);
                  return (
                    <span 
                      key={i} 
                      className={`px-3 py-1.5 font-mono text-[9px] uppercase font-bold border-2 transition-all ${
                        isRelevant 
                          ? 'bg-[#0a0a0a] border-[#0a0a0a] text-white shadow-[3px_3px_0_#2D8F6F]' 
                          : 'bg-white border-[#e5e5e0] text-[#cccccc] opacity-40'
                      }`}
                    >
                      {item}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Blockers */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-[#ff6b00]" />
                <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#8a8a8a]">Common Blockers & Pain Points</span>
              </div>
              <p className="text-3xl font-bold leading-tight italic text-[#0a0a0a]">"{persona.location.emotionalDrivers}"</p>
            </div>

            {/* Golden Nuggets */}
            <div className="grid grid-cols-1 gap-4">
              {persona.location.nuggets.map((n, i) => (
                <div key={i} className="flex gap-6 bg-[#2D8F6F]/5 p-8 border-l-8 border-[#2D8F6F] text-[#0a0a0a]">
                  <span className="font-mono text-4xl font-bold text-[#2D8F6F]/30 italic shrink-0">"</span>
                  <span className="text-xl font-medium leading-relaxed">{n}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case MatrixColumn.SPENDING:
        const isScholarshipExpected = persona.id === 'bridge' || persona.id === 'teen';
        return (
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="flex items-center gap-4 mb-8">
              <DollarSign className="w-8 h-8 text-[#00cc66]" />
              <h3 className="font-mono text-2xl font-bold uppercase tracking-tighter text-[#0a0a0a]">Education Budget Context</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b-2 border-[#0a0a0a] pb-12">
              <div className="space-y-2">
                <h4 className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-[0.2em] font-bold">Household Baseline</h4>
                <div className="font-mono text-5xl font-bold text-[#0a0a0a] tracking-tighter">
                  {persona.id === 'corp' ? '$250K - $600K+' : 
                   persona.id === 'life' ? '$180K - $400K+' :
                   persona.id === 'pivot' ? '$120K - $300K+' :
                   '$90K - $200K'}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-[0.2em] font-bold">Revenue Profile</h4>
                <div className={`font-mono text-4xl font-bold uppercase ${isScholarshipExpected ? 'text-[#ff6b00]' : 'text-[#2D8F6F]'}`}>
                  {isScholarshipExpected ? 'Partial Pay' : 'Full Pay'}
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#8a8a8a]">
                  {isScholarshipExpected ? '• Financial Aid Profile' : '• Direct Revenue'}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[#0a0a0a]" />
                <h4 className="font-mono text-sm font-bold uppercase tracking-widest">Spending Pattern</h4>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {persona.spending.ticketItems.map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-[#e5e5e0]">
                    <span className="font-bold text-lg uppercase tracking-tight">{item.item}</span>
                    <span className="font-mono text-lg font-bold text-[#00cc66]">{item.priceRange}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#f0f0eb] p-10 border-l-8 border-[#2D8F6F]">
              <div className="flex items-start gap-6">
                <Lightbulb className="w-8 h-8 text-[#2D8F6F] shrink-0 mt-1" />
                <div>
                  <p className="text-lg font-medium text-[#0a0a0a] leading-relaxed">
                    {persona.spending.sensitivity} Households are focused on {persona.spending.budgetRange.toLowerCase()}. 
                    {persona.id === 'corp' ? ' High willingness to pay for high-touch service and Ivy League outcomes.' : 
                     persona.id === 'pivot' ? ' Strong ROI alignment compared to the elite boarding baseline.' :
                     ' Strategic sensitivity to total cost of attendance including fees.'}
                  </p>
                  <p className="text-xs text-[#8a8a8a] font-mono font-bold uppercase tracking-widest mt-4 italic">* Tuition verification required with Admissions Office</p>
                </div>
              </div>
            </div>
          </div>
        );

      case MatrixColumn.COMPETITION:
        return (
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="flex items-center gap-4">
              <Trophy className="w-8 h-8 text-[#2D8F6F]" />
              <h3 className="font-mono text-2xl font-bold uppercase tracking-tighter">Competitive Analysis</h3>
            </div>
            
            <div className="space-y-8">
              {persona.competition.schools.map((school, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-8 border-b-2 border-[#0a0a0a] pb-8 last:border-b-0">
                  <div className="md:w-2/3">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-mono text-xl font-bold text-[#2D8F6F]">{String(i + 1).padStart(2, '0')}</span>
                      <h4 className="font-bold text-2xl uppercase tracking-wide">{school.name}</h4>
                    </div>
                    <p className="text-lg text-[#4a4a4a] leading-relaxed italic font-medium pl-6 border-l-4 border-[#2D8F6F]">"{school.reason}"</p>
                  </div>
                  <div className="md:w-1/3 flex flex-col justify-center">
                    <span className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-[0.3em] font-bold mb-2">Referral Pathway</span>
                    <div className="font-bold text-base uppercase tracking-wider text-[#0a0a0a] leading-relaxed">
                      {school.recommendationSource}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case MatrixColumn.STRATEGY:
        const strategyBullets = persona.strategy.split(', ').map(s => s.trim());
        return (
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <Zap className="w-8 h-8 text-[#2D8F6F]" />
                <h3 className="font-mono text-2xl font-bold text-[#0a0a0a] uppercase tracking-tighter">Value Alignment</h3>
              </div>
              
              <div className="space-y-2">
                {strategyBullets.map((bullet, i) => (
                  <div key={i} className="border-b border-[#e5e5e0]">
                    <button 
                      onClick={() => toggleBullet(i)}
                      className="w-full flex items-center justify-between py-6 text-left group"
                    >
                      <div className="flex items-center gap-6">
                        <div className={`w-3 h-3 bg-[#2D8F6F] transition-all ${expandedBullets.has(i) ? 'scale-150 rotate-45' : 'group-hover:scale-125'}`} />
                        <span className="text-2xl font-bold tracking-tight uppercase group-hover:text-[#2D8F6F] transition-colors">
                          {bullet.split(' ').slice(0, 3).join(' ')}...
                        </span>
                      </div>
                      {expandedBullets.has(i) ? <ChevronUp className="w-6 h-6 text-[#0a0a0a]" /> : <ChevronDown className="w-6 h-6 text-[#0a0a0a]" />}
                    </button>
                    {expandedBullets.has(i) && (
                      <div className="px-12 pb-8 animate-in fade-in slide-in-from-top-2 duration-200">
                        <p className="text-xl font-light leading-relaxed text-[#4a4a4a] border-l-4 border-[#2D8F6F] pl-6">
                          {bullet}. Our Canon research indicates this segment contributes directly to {bullet.toLowerCase()} which strengthens the institutional profile.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t-4 border-[#0a0a0a] pt-12">
              <div>
                <span className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-[0.3em] font-bold block mb-4">Core Contribution</span>
                <span className="font-mono text-3xl font-bold text-[#0a0a0a] uppercase tracking-tight">Community Diversity</span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-[0.3em] font-bold block mb-4">Strategic Impact</span>
                <span className="font-mono text-3xl font-bold text-[#0a0a0a] uppercase tracking-tight">Enrollment Stability</span>
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
        className={`fixed bottom-0 md:bottom-8 left-1/2 w-full max-w-[96vw] xl:max-w-7xl z-50 bg-[#fafafa] transition-all duration-300 ease-in-out border-2 border-[#0a0a0a] border-b-0 md:border-b-2 h-[85vh] md:h-[80vh] flex flex-col ${
          isOpen ? 'translate(-50%, 0)' : 'translate(-50%, 120%)'
        }`}
        style={{
          transform: isOpen ? 'translate(-50%, 0)' : 'translate(-50%, 120%)',
          boxShadow: '16px 16px 0 #0a0a0a'
        }}
      >
        {/* Header with Horizontal Tab Navigation */}
        <div className="px-6 md:px-12 py-6 border-b-2 border-[#0a0a0a] bg-[#0a0a0a]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {[
                { key: MatrixColumn.SEGMENT, label: persona.name },
                { key: MatrixColumn.LOCATION, label: 'Location' },
                { key: MatrixColumn.SPENDING, label: 'Budget' },
                { key: MatrixColumn.COMPETITION, label: 'Competition' },
                { key: MatrixColumn.STRATEGY, label: 'Value Alignment' }
              ].map((tab, idx) => (
                <React.Fragment key={tab.key}>
                  <button
                    onClick={() => {
                      if (tab.key !== colIndex) onNavigate(tab.key > colIndex ? 'right' : 'left');
                    }}
                    className={`px-6 py-3 font-mono text-xs uppercase tracking-widest border-2 transition-all whitespace-nowrap font-bold ${
                      colIndex === tab.key
                        ? 'border-[#2D8F6F] bg-[#2D8F6F] text-white shadow-[4px_4px_0_#fff]'
                        : 'border-transparent text-[#8a8a8a] hover:text-white hover:border-[#4a4a4a]'
                    }`}
                  >
                    {tab.label}
                  </button>
                  {idx < 4 && <span className="text-[#4a4a4a] mx-3 hidden md:inline">|</span>}
                </React.Fragment>
              ))}
            </div>
            <button onClick={onClose} className="p-3 border-2 border-transparent hover:border-[#4a4a4a] text-white transition-all ml-6 shrink-0 bg-white/5">
              <X className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto bg-[#f5f5f0] relative">
          {/* Side Nav Arrows - Stable Positioning */}
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate('left'); }}
            disabled={colIndex === MatrixColumn.SEGMENT}
            className={`fixed left-4 md:left-10 top-1/2 -translate-y-1/2 p-5 border-2 z-[60] transition-all bg-white ${
              colIndex === MatrixColumn.SEGMENT
                ? 'border-[#e5e5e0] opacity-30 cursor-not-allowed'
                : 'border-[#0a0a0a] hover:bg-[#2D8F6F] hover:text-white shadow-[6px_6px_0_#0a0a0a] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]'
            }`}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate('right'); }}
            disabled={colIndex === MatrixColumn.STRATEGY}
            className={`fixed right-4 md:right-10 top-1/2 -translate-y-1/2 p-5 border-2 z-[60] transition-all bg-white ${
              colIndex === MatrixColumn.STRATEGY
                ? 'border-[#e5e5e0] opacity-30 cursor-not-allowed'
                : 'border-[#0a0a0a] hover:bg-[#2D8F6F] hover:text-white shadow-[6px_6px_0_#0a0a0a] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]'
            }`}
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="px-12 md:px-24 pt-12 md:pt-20 pb-24 min-h-full flex flex-col items-center">
            <div className="w-full max-w-6xl">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPanel;

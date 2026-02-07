import React from 'react';
import { Persona, MatrixColumn, COLUMNS } from '../types';
import { ChevronLeft, ChevronRight, X, MapPin, DollarSign, Trophy, Sparkles, Route } from 'lucide-react';
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
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div className={`
        fixed bottom-0 left-0 right-0 z-50 bg-white shadow-[0_-20px_60px_-12px_rgba(0,0,0,0.3)] 
        transition-transform duration-500 ease-in-out rounded-t-[40px] border-t border-slate-100
        h-[80vh] overflow-hidden flex flex-col
        ${isOpen ? 'translate-y-0' : 'translate-y-full'}
      `}>
        
        {/* Navigation Arrows */}
        <button 
          onClick={(e) => { e.stopPropagation(); onNavigate('left'); }}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-5 bg-white/90 hover:bg-white rounded-full shadow-xl z-[60] border border-slate-100 group transition-all hover:scale-110 active:scale-95"
          aria-label="Previous Column"
        >
          <ChevronLeft className="w-10 h-10 text-slate-400 group-hover:text-emerald-600 transition-colors" />
        </button>

        <button 
          onClick={(e) => { e.stopPropagation(); onNavigate('right'); }}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-5 bg-white/90 hover:bg-white rounded-full shadow-xl z-[60] border border-slate-100 group transition-all hover:scale-110 active:scale-95"
          aria-label="Next Column"
        >
          <ChevronRight className="w-10 h-10 text-slate-400 group-hover:text-emerald-600 transition-colors" />
        </button>

        {/* Header */}
        <div className="px-12 py-8 border-b border-slate-100 flex items-center justify-between bg-white relative">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-1">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                {COLUMNS[colIndex]}
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{persona.name}</h2>
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">Persona Strategy Matrix</p>
          </div>

          <button onClick={onClose} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-full transition-all border border-slate-100">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-12 py-10">
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
        <div className="space-y-8">
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
          <div className="flex flex-col items-center justify-center text-center py-12 bg-slate-50 rounded-[32px]">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <Route className="w-12 h-12 text-emerald-600" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">Journey Map Available</h3>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl">
              This persona has {persona.touchPoints?.length || 0} touch points with detailed actions,
              partner information, and progressive disclosure of data.
            </p>
            <button
              onClick={() => onOpenTouchPointModal(persona)}
              className="text-emerald-600 hover:text-emerald-700 text-lg font-medium underline underline-offset-4 transition-all"
            >
              Explore full journey map
            </button>

            {/* Quick Preview */}
            {persona.touchPoints && (
              <div className="mt-12 grid grid-cols-3 gap-6 max-w-4xl">
                {persona.touchPoints.map((tp, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 text-left shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <h4 className="font-bold text-slate-900">{tp.title}</h4>
                    </div>
                    <p className="text-sm text-slate-600">{tp.subtitle}</p>
                    <p className="text-xs text-slate-400 mt-2">{tp.actions.length} actions</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );

    case MatrixColumn.LOCATION:
      return (
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-10">
            <section>
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-widest flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Concrete Expectations
              </h4>
              <div className="grid gap-3">
                {persona.location.expecting.map((item, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm font-semibold text-slate-800 hover:border-emerald-100 transition-colors">
                    {item}
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-widest">Cultural Baseline (Used To)</h4>
              <div className="flex flex-wrap gap-2">
                {persona.location.usedTo.map((item, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-sm border border-slate-100">
                    {item}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
             <div className="bg-emerald-50 p-8 rounded-[32px] border border-emerald-100">
                <h4 className="text-xs font-bold text-emerald-700 uppercase mb-4">Emotional Anchor</h4>
                <p className="text-emerald-900 font-bold leading-snug text-2xl">
                  {persona.location.emotionalDrivers}
                </p>
             </div>
             <div className="p-8 bg-amber-50 rounded-[32px] border border-amber-100">
                <h4 className="text-xs font-bold text-amber-700 uppercase mb-4 tracking-widest">Golden Nuggets</h4>
                {persona.location.nuggets.map((n, i) => {
                  if (n === 'sankey_graph_reference') {
                    return (
                      <div key={i} className="mt-4">
                        <a 
                          href="/Saint Stephens Research Data/sankey_img_transfers.html" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 text-sm font-medium rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          View IMG Transfer Flow Visualization →
                        </a>
                      </div>
                    );
                  }
                  return (
                    <div key={i} className="flex gap-3 text-amber-900 text-sm leading-relaxed mb-4 last:mb-0">
                      <span className="text-amber-400 text-lg font-black leading-none">"</span>
                      {n}
                    </div>
                  );
                })}
             </div>
          </div>
        </div>
      );

    case MatrixColumn.SPENDING:
      return (
        <div className="grid md:grid-cols-[1fr_400px] gap-12">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <DollarSign className="text-emerald-500 w-5 h-5" />
              Spend Allocation Checklist
            </h3>
            <div className="bg-slate-50 rounded-[32px] border border-slate-100 overflow-hidden">
               <div className="max-h-[380px] overflow-y-auto p-6 space-y-3">
                  {persona.spending.ticketItems.map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center group hover:border-emerald-200 transition-all hover:translate-x-1">
                      <span className="font-bold text-slate-800 text-lg">{item.item}</span>
                      <span className="text-emerald-600 font-black text-xl tabular-nums">{item.priceRange}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-2xl">
              <h4 className="text-slate-400 font-bold uppercase text-[10px] mb-2 tracking-widest">Annual Academic Target</h4>
              <p className="text-5xl font-black text-slate-900 mb-8">{persona.spending.budgetRange}</p>
              
              <div className="space-y-4 pt-8 border-t border-slate-100">
                 <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Sensitivity Matrix</div>
                 <div className="bg-emerald-600 text-white p-5 rounded-2xl font-bold text-center text-lg shadow-lg shadow-emerald-200">
                   {persona.spending.sensitivity}
                 </div>
              </div>
            </div>
          </div>
        </div>
      );

    case MatrixColumn.COMPETITION:
      return (
        <div className="max-w-4xl mx-auto space-y-10">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Trophy className="text-emerald-500 w-5 h-5" />
            Competitive Benchmarking
          </h3>
          <div className="grid gap-8">
            {persona.competition.schools.map((school, i) => (
              <div key={i} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-10 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                     <span className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-lg">{i+1}</span>
                     <h4 className="text-3xl font-black text-slate-900 tracking-tight">{school.name}</h4>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 relative">
                    <p className="text-lg text-slate-700 leading-relaxed font-medium">
                      "{school.reason}"
                    </p>
                  </div>
                </div>
                <div className="md:w-72 bg-emerald-50/50 p-6 rounded-[32px] border border-emerald-100">
                   <span className="text-[10px] font-black text-emerald-700 uppercase block mb-4 tracking-widest">Referral Ecosystem</span>
                   <div className="font-bold text-slate-900 text-lg leading-tight">
                     {school.recommendationSource}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case MatrixColumn.STRATEGY:
      return (
        <div className="max-w-4xl mx-auto py-6">
          <div className="bg-slate-900 text-white p-16 rounded-[60px] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/20 rounded-full -mr-40 -mt-40 blur-[80px]" />
             <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full -ml-20 -mb-20 blur-[60px]" />
             
             <h3 className="text-emerald-400 font-bold uppercase text-[10px] mb-8 tracking-[0.3em] flex items-center gap-3">
                <div className="w-10 h-[1px] bg-emerald-400" /> 2026 Strategic Blueprint
             </h3>
             
             <p className="text-4xl font-light leading-[1.3] mb-16 text-slate-50">
               {persona.strategy}
             </p>
             
             <div className="grid grid-cols-2 gap-12 border-t border-slate-800 pt-12">
                <div>
                   <span className="text-slate-500 text-[10px] font-black uppercase block mb-3 tracking-widest">Primary Objective</span>
                   <span className="text-2xl font-bold text-white">Segment Capture</span>
                </div>
                <div>
                   <span className="text-slate-500 text-[10px] font-black uppercase block mb-3 tracking-widest">Success Metric</span>
                   <span className="text-2xl font-bold text-white">Conversion ROI</span>
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

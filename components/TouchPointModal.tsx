import React, { useState } from 'react';
import { Persona, TouchPoint } from '../types';
import { X, Check, Circle, Building2, Users, Globe, Lightbulb, Trophy, Heart, Sparkles, MapPin, Target } from 'lucide-react';

interface TouchPointModalProps {
  persona: Persona;
  isOpen: boolean;
  onClose: () => void;
}

const TouchPointModal: React.FC<TouchPointModalProps> = ({ persona, isOpen, onClose }) => {
  const [activeTouchPointIndex, setActiveTouchPointIndex] = useState(0);
  const [selectedActions, setSelectedActions] = useState<Set<string>>(new Set());

  const touchPoints = persona.touchPoints || [];
  const activeTouchPoint = touchPoints[activeTouchPointIndex] || touchPoints[0];

  const handleActionToggle = (actionId: string) => {
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'immediate': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'short-term': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'long-term': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getTouchPointIcon = (index: number) => {
    const icons = [Building2, Users, Globe, Lightbulb, Trophy, Heart, Sparkles];
    const Icon = icons[index % icons.length];
    return <Icon className="w-4 h-4" />;
  };

  if (!isOpen || touchPoints.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-widest">
                Journey Map
              </span>
              <h2 className="text-2xl font-black text-slate-900">{persona.name}</h2>
            </div>
            <p className="text-xs text-slate-400 font-medium">{touchPoints.length} touch points • Progressive disclosure</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-all border border-slate-100"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Left Column - Touch Point Selector (smaller indicators) */}
          <div className="w-[350px] border-r border-slate-100 flex flex-col bg-slate-50/50">
            
            {/* Compact Vertical Step Indicator */}
            <div className="p-4 flex justify-center">
              <div className="flex items-center gap-2">
                {touchPoints.map((tp, index) => (
                  <React.Fragment key={tp.id}>
                    <button
                      onClick={() => setActiveTouchPointIndex(index)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        index === activeTouchPointIndex
                          ? 'bg-emerald-600 text-white shadow-md'
                          : index < activeTouchPointIndex
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-white text-slate-400 border border-slate-200'
                      }`}
                    >
                      {index < activeTouchPointIndex ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        index + 1
                      )}
                    </button>
                    {index < touchPoints.length - 1 && (
                      <div className={`w-6 h-0.5 ${
                        index < activeTouchPointIndex ? 'bg-emerald-300' : 'bg-slate-200'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Touch Point List */}
            <div className="flex-1 overflow-y-auto px-4 pb-4">
              <div className="space-y-2">
                {touchPoints.map((tp, index) => (
                  <button
                    key={tp.id}
                    onClick={() => setActiveTouchPointIndex(index)}
                    className={`w-full text-left p-4 rounded-2xl transition-all ${
                      index === activeTouchPointIndex
                        ? 'bg-white shadow-md border-2 border-emerald-200 ring-1 ring-emerald-100'
                        : 'bg-white border border-slate-200 hover:border-emerald-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 ${index === activeTouchPointIndex ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {getTouchPointIcon(index)}
                      </div>
                      <div>
                        <h3 className={`font-bold text-sm ${index === activeTouchPointIndex ? 'text-emerald-900' : 'text-slate-700'}`}>
                          {tp.title}
                        </h3>
                        <p className="text-[10px] text-slate-500 mt-0.5">{tp.subtitle}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Dynamic Content with Actions */}
          <div className="flex-1 overflow-y-auto bg-white">
            <div className="p-8">
              {/* Touch Point Description */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{getTouchPointIcon(activeTouchPointIndex)}</span>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">{activeTouchPoint.title}</h3>
                    <p className="text-emerald-600 font-medium">{activeTouchPoint.subtitle}</p>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed">{activeTouchPoint.description}</p>
              </div>

              {/* Dynamic Content */}
              <div className="mb-8">
                <RightPanelContent 
                  type={activeTouchPoint.rightPanelType} 
                  data={activeTouchPoint.rightPanelData} 
                />
              </div>

              {/* Actions Section - Now in right panel under the touch point */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-black text-slate-500 uppercase mb-4 tracking-widest flex items-center gap-2">
                  <Target className="w-4 h-4" /> Recommended Actions for This Touch Point
                </h4>
                <div className="space-y-3">
                  {activeTouchPoint.actions.map((action) => (
                    <label
                      key={action.id}
                      className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-emerald-200 transition-all"
                    >
                      <div className="mt-0.5">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          selectedActions.has(action.id)
                            ? 'bg-emerald-500 border-emerald-500'
                            : 'border-slate-300'
                        }`}>
                          {selectedActions.has(action.id) && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                      </div>
                      <div className="flex-1" onClick={() => handleActionToggle(action.id)}>
                        <p className="text-sm text-slate-700 leading-snug">{action.text}</p>
                        <span className={`inline-block mt-1.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${getPriorityColor(action.priority)}`}>
                          {action.priority}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Plan Bar - Bottom */}
        {selectedActions.size > 0 && (
          <div className="border-t border-slate-100 bg-slate-50 px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-700">Campaign Action Plan ({selectedActions.size} selected)</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {Array.from(selectedActions).map(actionId => {
                    const action = touchPoints.flatMap(tp => tp.actions).find(a => a.id === actionId);
                    if (!action) return null;
                    return (
                      <span key={actionId} className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                        <Check className="w-3 h-3" />
                        {action.text.substring(0, 40)}{action.text.length > 40 ? '...' : ''}
                      </span>
                    );
                  })}
                </div>
              </div>
              <button 
                onClick={() => setSelectedActions(new Set())}
                className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 font-medium"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const RightPanelContent: React.FC<{ type: string; data: any }> = ({ type, data }) => {
  switch (type) {
    case 'companies':
      return (
        <div className="space-y-6">
          {/* Tier 1 */}
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
            <h4 className="text-xs font-black text-emerald-700 uppercase mb-4 tracking-widest flex items-center gap-2">
              <Building2 className="w-4 h-4" /> Tier 1 — Very High Likelihood
            </h4>
            <div className="space-y-3">
              {data.tier1.map((company: any, i: number) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-emerald-100">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-slate-900">{company.name}</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                      {company.likelihood}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1">{company.jobs}</p>
                  <p className="text-xs text-slate-600 italic">{company.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tier 2 */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h4 className="text-xs font-black text-slate-500 uppercase mb-4 tracking-widest">Tier 2 — High Likelihood</h4>
            <div className="space-y-3">
              {data.tier2.map((company: any, i: number) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-slate-900">{company.name}</span>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                      {company.likelihood}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1">{company.jobs}</p>
                  <p className="text-xs text-slate-600 italic">{company.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'partners':
      return (
        <div className="grid grid-cols-2 gap-4">
          {data.categories.map((category: any, i: number) => (
            <div key={i} className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h4 className="text-[10px] font-black text-slate-500 uppercase mb-3 tracking-widest">{category.title}</h4>
              <div className="space-y-2">
                {category.items.map((item: string, j: number) => (
                  <p key={j} className="text-sm text-slate-700 font-medium">{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case 'digital':
      return (
        <div className="space-y-6">
          {data.channels && (
            <div>
              <h4 className="text-xs font-black text-slate-500 uppercase mb-3 tracking-widest">Digital Channels</h4>
              <div className="flex flex-wrap gap-2">
                {data.channels.map((channel: string, i: number) => (
                  <span key={i} className="px-3 py-2 bg-slate-100 text-slate-700 text-sm rounded-lg border border-slate-200">
                    {channel}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {data.expectations && (
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
              <h4 className="text-xs font-black text-emerald-700 uppercase mb-4 tracking-widest">Expectations We Must Meet</h4>
              <div className="space-y-3">
                {data.expectations.map((exp: any, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
                    <div>
                      <p className="font-bold text-slate-900">{exp.title}</p>
                      <p className="text-sm text-slate-600">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.contentTypes && (
            <div>
              <h4 className="text-xs font-black text-slate-500 uppercase mb-3 tracking-widest">Content Types</h4>
              <div className="space-y-2">
                {data.contentTypes.map((content: any, i: number) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-slate-100">
                    <p className="font-bold text-slate-900">{content.title}</p>
                    <p className="text-sm text-slate-600">{content.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.triggers && (
            <div>
              <h4 className="text-xs font-black text-slate-500 uppercase mb-3 tracking-widest">Crisis Triggers</h4>
              <div className="space-y-2">
                {data.triggers.map((trigger: any, i: number) => (
                  <div key={i} className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-amber-900">{trigger.trigger}</p>
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">{trigger.frequency}</span>
                    </div>
                    <p className="text-sm text-amber-700 mt-1">{trigger.timing}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );

    case 'communities':
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {data.communities.map((community: any, i: number) => (
              <div key={i} className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-1">{community.name}</h4>
                <p className="text-xs text-slate-500">{community.type}</p>
                <span className="inline-block mt-2 px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded">
                  {community.relevance}
                </span>
              </div>
            ))}
          </div>
          
          {data.events && (
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
              <h4 className="text-xs font-black text-emerald-700 uppercase mb-3 tracking-widest">Recommended Events</h4>
              <div className="space-y-2">
                {data.events.map((event: string, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    <p className="text-sm text-emerald-900">{event}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );

    case 'validation':
      return (
        <div className="space-y-6">
          {data.validationPoints && (
            <div>
              <h4 className="text-xs font-black text-slate-500 uppercase mb-3 tracking-widest">Validation Points</h4>
              <div className="space-y-3">
                {data.validationPoints.map((point: any, i: number) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-slate-100">
                    <p className="font-bold text-slate-900">{point.title}</p>
                    <p className="text-sm text-slate-600">{point.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.proofPoints && (
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
              <h4 className="text-xs font-black text-emerald-700 uppercase mb-3 tracking-widest">Proof Points</h4>
              <div className="grid grid-cols-2 gap-2">
                {data.proofPoints.map((proof: string, i: number) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5" />
                    <p className="text-sm text-emerald-900">{proof}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.successStories && (
            <div>
              <h4 className="text-xs font-black text-slate-500 uppercase mb-3 tracking-widest">Success Stories</h4>
              <div className="space-y-2">
                {data.successStories.map((story: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <p className="text-sm text-slate-700">{story}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );

    case 'social':
      return (
        <div className="space-y-6">
          {data.testimonials && (
            <div>
              <h4 className="text-xs font-black text-slate-500 uppercase mb-3 tracking-widest">Testimonials</h4>
              <div className="space-y-3">
                {data.testimonials.map((testimonial: any, i: number) => (
                  <div key={i} className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{testimonial.family}</p>
                        <p className="text-xs text-slate-500">From: {testimonial.from}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 italic">"{testimonial.highlight}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.proofPoints && (
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
              <h4 className="text-xs font-black text-emerald-700 uppercase mb-3 tracking-widest">Proof Points</h4>
              <div className="grid grid-cols-2 gap-2">
                {data.proofPoints.map((proof: string, i: number) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5" />
                    <p className="text-sm text-emerald-900">{proof}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.programs && (
            <div>
              <h4 className="text-xs font-black text-slate-500 uppercase mb-3 tracking-widest">Programs</h4>
              <div className="space-y-2">
                {data.programs.map((program: any, i: number) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-slate-100">
                    <p className="font-bold text-slate-900">{program.name}</p>
                    <p className="text-sm text-slate-600">{program.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );

    default:
      return <div className="text-slate-500">No data available</div>;
  }
};

export default TouchPointModal;

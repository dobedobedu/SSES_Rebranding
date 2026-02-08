import React, { useState } from 'react';
import { Persona, TouchPoint } from '../types';
import { X, Check, Building2, Users, Globe, Lightbulb, Trophy, Heart, Sparkles, MapPin, Target } from 'lucide-react';

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

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'immediate': return { bg: '#ff6b00', text: 'white', border: '#ff6b00' };
      case 'short-term': return { bg: '#0066ff', text: 'white', border: '#0066ff' };
      case 'long-term': return { bg: '#4a4a4a', text: 'white', border: '#4a4a4a' };
      default: return { bg: '#f5f5f0', text: '#0a0a0a', border: '#0a0a0a' };
    }
  };

  const getPersonaColor = () => {
    switch (persona.priorityType) {
      case 'img-switcher': return '#ff6b00';
      case 'bridge-crosser': return '#0066ff';
      case 'teen-driver': return '#9933ff';
      default: return '#0a0a0a';
    }
  };

  const getTouchPointIcon = (index: number) => {
    const icons = [Building2, Users, Globe, Lightbulb, Trophy, Heart, Sparkles];
    const Icon = icons[index % icons.length];
    return <Icon className="w-4 h-4" />;
  };

  if (!isOpen || touchPoints.length === 0) return null;

  const accentColor = getPersonaColor();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0a0a0a]/80"
        onClick={onClose}
      />

      {/* Modal Container - TE Style */}
      <div className="relative bg-[#fafafa] border-2 border-[#0a0a0a] shadow-[12px_12px_0_#0a0a0a] w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header - TE Style */}
        <div className="px-6 py-4 border-b-2 border-[#0a0a0a] flex items-center justify-between bg-[#0a0a0a] text-white">
          <div className="flex items-center gap-4">
            <div className="w-1 h-10" style={{ backgroundColor: accentColor }} />
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-[10px] font-bold px-2 py-1 uppercase tracking-wider text-white"
                  style={{ backgroundColor: accentColor }}
                >
                  Journey Map
                </span>
                <h2 className="font-mono text-lg font-bold uppercase tracking-wide">{persona.name}</h2>
              </div>
              <p className="font-mono text-[10px] text-[#8a8a8a] mt-1">
                {touchPoints.length} touch points / Progressive disclosure
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 border-2 border-white hover:bg-white hover:text-[#0a0a0a] transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">

          {/* Left Column - Touch Point Selector */}
          <div className="w-[320px] border-r-2 border-[#0a0a0a] flex flex-col bg-[#f5f5f0]">

            {/* Step Indicator */}
            <div className="p-4 border-b border-[#0a0a0a] bg-[#0a0a0a]">
              <div className="flex items-center gap-1 justify-center">
                {touchPoints.map((tp, index) => (
                  <React.Fragment key={tp.id}>
                    <button
                      onClick={() => setActiveTouchPointIndex(index)}
                      className={`w-7 h-7 flex items-center justify-center font-mono text-xs font-bold transition-all border-2 ${
                        index === activeTouchPointIndex
                          ? 'text-white'
                          : index < activeTouchPointIndex
                          ? 'bg-[#00cc66] text-white border-[#00cc66]'
                          : 'bg-transparent text-[#8a8a8a] border-[#4a4a4a]'
                      }`}
                      style={index === activeTouchPointIndex ? { backgroundColor: accentColor, borderColor: accentColor } : {}}
                    >
                      {index < activeTouchPointIndex ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        String(index + 1).padStart(2, '0')
                      )}
                    </button>
                    {index < touchPoints.length - 1 && (
                      <div className={`w-4 h-0.5 ${
                        index < activeTouchPointIndex ? 'bg-[#00cc66]' : 'bg-[#4a4a4a]'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Touch Point List */}
            <div className="flex-1 overflow-y-auto p-2">
              <div className="space-y-1">
                {touchPoints.map((tp, index) => (
                  <button
                    key={tp.id}
                    onClick={() => setActiveTouchPointIndex(index)}
                    className={`w-full text-left p-3 transition-all border-2 ${
                      index === activeTouchPointIndex
                        ? 'bg-white border-[#0a0a0a]'
                        : 'bg-white border-transparent hover:border-[#0a0a0a]'
                    }`}
                    style={index === activeTouchPointIndex ? { borderLeftColor: accentColor, borderLeftWidth: '4px' } : {}}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="mt-0.5"
                        style={{ color: index === activeTouchPointIndex ? accentColor : '#8a8a8a' }}
                      >
                        {getTouchPointIcon(index)}
                      </div>
                      <div>
                        <h3 className={`font-mono text-xs font-bold uppercase tracking-wide ${
                          index === activeTouchPointIndex ? '' : 'text-[#4a4a4a]'
                        }`}
                        style={index === activeTouchPointIndex ? { color: accentColor } : {}}
                        >
                          {tp.title}
                        </h3>
                        <p className="font-mono text-[10px] text-[#8a8a8a] mt-0.5">{tp.subtitle}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="flex-1 overflow-y-auto bg-white">
            <div className="p-6">
              {/* Touch Point Description */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="w-10 h-10 flex items-center justify-center"
                    style={{ backgroundColor: accentColor, color: 'white' }}
                  >
                    {getTouchPointIcon(activeTouchPointIndex)}
                  </span>
                  <div>
                    <h3 className="font-mono text-xl font-bold uppercase tracking-wide">{activeTouchPoint.title}</h3>
                    <p className="font-mono text-xs font-bold" style={{ color: accentColor }}>{activeTouchPoint.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm text-[#4a4a4a] leading-relaxed">{activeTouchPoint.description}</p>
              </div>

              {/* Dynamic Content */}
              <div className="mb-6">
                <RightPanelContent
                  type={activeTouchPoint.rightPanelType}
                  data={activeTouchPoint.rightPanelData}
                  accentColor={accentColor}
                />
              </div>

              {/* Actions Section */}
              <div className="border-2 border-[#0a0a0a]">
                <div className="border-b border-[#0a0a0a] px-4 py-2 bg-[#0a0a0a] flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#ff6b00]" />
                  <span className="font-mono text-[10px] text-white uppercase tracking-widest">Recommended Actions</span>
                </div>
                <div className="p-0 divide-y divide-[#e5e5e0]">
                  {activeTouchPoint.actions.map((action) => {
                    const styles = getPriorityStyles(action.priority);
                    return (
                      <label
                        key={action.id}
                        className="flex items-start gap-3 p-4 cursor-pointer hover:bg-[#f5f5f0] transition-all"
                      >
                        <div className="mt-0.5">
                          <div
                            className={`w-5 h-5 border-2 flex items-center justify-center transition-all`}
                            style={{
                              backgroundColor: selectedActions.has(action.id) ? '#0a0a0a' : 'transparent',
                              borderColor: '#0a0a0a'
                            }}
                          >
                            {selectedActions.has(action.id) && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                        </div>
                        <div className="flex-1" onClick={() => handleActionToggle(action.id)}>
                          <p className="text-sm text-[#0a0a0a] leading-snug">{action.text}</p>
                          <span
                            className="inline-block mt-2 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider"
                            style={{ backgroundColor: styles.bg, color: styles.text }}
                          >
                            {action.priority}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Plan Bar - Bottom */}
        {selectedActions.size > 0 && (
          <div className="border-t-2 border-[#0a0a0a] bg-[#0a0a0a] px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  Campaign Action Plan ({selectedActions.size} selected)
                </h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {Array.from(selectedActions).map(actionId => {
                    const action = touchPoints.flatMap(tp => tp.actions).find(a => a.id === actionId);
                    if (!action) return null;
                    return (
                      <span
                        key={actionId}
                        className="inline-flex items-center gap-1 px-2 py-1 font-mono text-[10px] text-white border border-white/30"
                      >
                        <Check className="w-3 h-3" style={{ color: accentColor }} />
                        {action.text.substring(0, 35)}{action.text.length > 35 ? '...' : ''}
                      </span>
                    );
                  })}
                </div>
              </div>
              <button
                onClick={() => setSelectedActions(new Set())}
                className="px-4 py-2 font-mono text-xs text-[#8a8a8a] uppercase tracking-wider hover:text-white transition-colors"
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

const RightPanelContent: React.FC<{ type: string; data: any; accentColor: string }> = ({ type, data, accentColor }) => {
  switch (type) {
    case 'companies':
      return (
        <div className="space-y-4">
          {/* Tier 1 */}
          <div className="border-2 border-[#0a0a0a]">
            <div className="border-b border-[#0a0a0a] px-4 py-2 bg-[#0a0a0a] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#00cc66]" />
              <span className="font-mono text-[10px] text-white uppercase tracking-widest">Tier 1 — Very High Likelihood</span>
            </div>
            <div className="divide-y divide-[#e5e5e0]">
              {data.tier1.map((company: any, i: number) => (
                <div key={i} className="p-4 hover:bg-[#f5f5f0] transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-sm uppercase tracking-wide">{company.name}</span>
                    <span className="font-mono text-[9px] font-bold px-2 py-0.5 bg-[#00cc66] text-white">
                      {company.likelihood}
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-[#8a8a8a] mb-1">{company.jobs}</p>
                  <p className="text-xs text-[#4a4a4a]">{company.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tier 2 */}
          <div className="border-2 border-[#4a4a4a]">
            <div className="border-b border-[#4a4a4a] px-4 py-2 bg-[#4a4a4a]">
              <span className="font-mono text-[10px] text-white uppercase tracking-widest">Tier 2 — High Likelihood</span>
            </div>
            <div className="divide-y divide-[#e5e5e0]">
              {data.tier2.map((company: any, i: number) => (
                <div key={i} className="p-4 hover:bg-[#f5f5f0] transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-sm uppercase tracking-wide">{company.name}</span>
                    <span className="font-mono text-[9px] font-bold px-2 py-0.5 bg-[#4a4a4a] text-white">
                      {company.likelihood}
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-[#8a8a8a] mb-1">{company.jobs}</p>
                  <p className="text-xs text-[#4a4a4a]">{company.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'partners':
      return (
        <div className="grid grid-cols-2 gap-2">
          {data.categories.map((category: any, i: number) => (
            <div key={i} className="border-2 border-[#0a0a0a]">
              <div className="border-b border-[#0a0a0a] px-3 py-2 bg-[#f5f5f0]">
                <span className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest">{category.title}</span>
              </div>
              <div className="p-3 space-y-1">
                {category.items.map((item: string, j: number) => (
                  <p key={j} className="text-xs font-medium">{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case 'digital':
      return (
        <div className="space-y-4">
          {data.channels && (
            <div>
              <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest mb-2 border-b border-[#e5e5e0] pb-2">
                Digital Channels
              </div>
              <div className="grid grid-cols-2 gap-1">
                {data.channels.map((channel: string, i: number) => (
                  <div key={i} className="px-3 py-2 bg-[#0a0a0a] text-white font-mono text-xs text-center">
                    {channel}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.expectations && (
            <div className="border-2 border-[#0a0a0a]">
              <div className="border-b border-[#0a0a0a] px-4 py-2" style={{ backgroundColor: accentColor }}>
                <span className="font-mono text-[10px] text-white uppercase tracking-widest">Expectations We Must Meet</span>
              </div>
              <div className="divide-y divide-[#e5e5e0]">
                {data.expectations.map((exp: any, i: number) => (
                  <div key={i} className="p-4">
                    <p className="font-bold text-sm">{exp.title}</p>
                    <p className="text-xs text-[#4a4a4a] mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.contentTypes && (
            <div>
              <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest mb-2 border-b border-[#e5e5e0] pb-2">
                Content Types
              </div>
              <div className="space-y-1">
                {data.contentTypes.map((content: any, i: number) => (
                  <div key={i} className="border border-[#0a0a0a] p-3">
                    <p className="font-bold text-xs">{content.title}</p>
                    <p className="text-[10px] text-[#4a4a4a]">{content.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.triggers && (
            <div>
              <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest mb-2 border-b border-[#e5e5e0] pb-2">
                Crisis Triggers
              </div>
              <div className="space-y-1">
                {data.triggers.map((trigger: any, i: number) => (
                  <div key={i} className="border-2 border-[#ff6b00] p-3 bg-[#f5f5f0]">
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-sm text-[#0a0a0a]">{trigger.trigger}</p>
                      <span className="font-mono text-[9px] font-bold px-2 py-0.5 bg-[#ff6b00] text-white">
                        {trigger.frequency}
                      </span>
                    </div>
                    <p className="font-mono text-[10px] text-[#4a4a4a] mt-1">{trigger.timing}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );

    case 'communities':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {data.communities.map((community: any, i: number) => (
              <div key={i} className="border-2 border-[#0a0a0a] p-3">
                <h4 className="font-bold text-sm uppercase tracking-wide">{community.name}</h4>
                <p className="font-mono text-[10px] text-[#8a8a8a]">{community.type}</p>
                <span className="inline-block mt-2 px-2 py-0.5 font-mono text-[9px] font-bold text-white" style={{ backgroundColor: accentColor }}>
                  {community.relevance}
                </span>
              </div>
            ))}
          </div>

          {data.events && (
            <div className="border-2 border-[#0a0a0a]">
              <div className="border-b border-[#0a0a0a] px-4 py-2" style={{ backgroundColor: accentColor }}>
                <span className="font-mono text-[10px] text-white uppercase tracking-widest">Recommended Events</span>
              </div>
              <div className="p-3 space-y-1">
                {data.events.map((event: string, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    <MapPin className="w-3 h-3" style={{ color: accentColor }} />
                    <p className="text-xs">{event}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );

    case 'validation':
      return (
        <div className="space-y-4">
          {data.validationPoints && (
            <div>
              <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest mb-2 border-b border-[#e5e5e0] pb-2">
                Validation Points
              </div>
              <div className="space-y-1">
                {data.validationPoints.map((point: any, i: number) => (
                  <div key={i} className="border border-[#0a0a0a] p-3">
                    <p className="font-bold text-sm">{point.title}</p>
                    <p className="text-[10px] text-[#4a4a4a]">{point.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.proofPoints && (
            <div className="border-2 border-[#00cc66]">
              <div className="border-b border-[#00cc66] px-4 py-2 bg-[#00cc66]">
                <span className="font-mono text-[10px] text-white uppercase tracking-widest">Proof Points</span>
              </div>
              <div className="grid grid-cols-2 gap-px bg-[#e5e5e0]">
                {data.proofPoints.map((proof: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-white">
                    <Check className="w-4 h-4 text-[#00cc66] mt-0.5 flex-shrink-0" />
                    <p className="text-xs">{proof}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.successStories && (
            <div>
              <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest mb-2 border-b border-[#e5e5e0] pb-2">
                Success Stories
              </div>
              <div className="space-y-1">
                {data.successStories.map((story: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 p-2 border border-[#0a0a0a] bg-[#f5f5f0]">
                    <Trophy className="w-4 h-4 text-[#ff6b00]" />
                    <p className="text-xs">{story}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );

    case 'social':
      return (
        <div className="space-y-4">
          {data.testimonials && (
            <div>
              <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest mb-2 border-b border-[#e5e5e0] pb-2">
                Testimonials
              </div>
              <div className="space-y-2">
                {data.testimonials.map((testimonial: any, i: number) => (
                  <div key={i} className="border-2 border-[#0a0a0a] p-4">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-8 h-8 bg-[#0a0a0a] flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-sm uppercase tracking-wide">{testimonial.family}</p>
                        <p className="font-mono text-[10px] text-[#8a8a8a]">From: {testimonial.from}</p>
                      </div>
                    </div>
                    <p className="text-xs text-[#4a4a4a]">"{testimonial.highlight}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.proofPoints && (
            <div className="border-2 border-[#00cc66]">
              <div className="border-b border-[#00cc66] px-4 py-2 bg-[#00cc66]">
                <span className="font-mono text-[10px] text-white uppercase tracking-widest">Proof Points</span>
              </div>
              <div className="grid grid-cols-2 gap-px bg-[#e5e5e0]">
                {data.proofPoints.map((proof: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-white">
                    <Check className="w-4 h-4 text-[#00cc66] mt-0.5 flex-shrink-0" />
                    <p className="text-xs">{proof}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.programs && (
            <div>
              <div className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest mb-2 border-b border-[#e5e5e0] pb-2">
                Programs
              </div>
              <div className="space-y-1">
                {data.programs.map((program: any, i: number) => (
                  <div key={i} className="border border-[#0a0a0a] p-3">
                    <p className="font-bold text-sm">{program.name}</p>
                    <p className="text-[10px] text-[#4a4a4a]">{program.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );

    default:
      return <div className="font-mono text-xs text-[#8a8a8a]">No data available</div>;
  }
};

export default TouchPointModal;

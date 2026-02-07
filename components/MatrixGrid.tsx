import React, { useState } from 'react';
import { Persona, COLUMNS, MatrixColumn, PrioritySegmentType } from '../types';
import { Map, Target, DollarSign, Trophy, Sparkles, Route } from 'lucide-react';
import SegmentQuickView from './SegmentQuickView';

interface MatrixGridProps {
  personas: Persona[];
  onSelectCell: (persona: Persona, colIndex: MatrixColumn) => void;
  activeCell: { personaId: string | null; colIndex: MatrixColumn | null };
  isPanelOpen: boolean;
  onOpenTouchPointModal: (persona: Persona) => void;
}

const MatrixGrid: React.FC<MatrixGridProps> = ({
  personas,
  onSelectCell,
  activeCell,
  isPanelOpen,
  onOpenTouchPointModal
}) => {
  const [quickViewSegment, setQuickViewSegment] = useState<PrioritySegmentType>(null);
  const [quickViewPosition, setQuickViewPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (persona: Persona, e: React.MouseEvent) => {
    if (persona.priorityType) {
      setQuickViewSegment(persona.priorityType);
      setQuickViewPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseLeave = () => {
    setQuickViewSegment(null);
  };

  const getPriorityStyles = (priorityType: PrioritySegmentType) => {
    switch (priorityType) {
      case 'img-switcher':
        return {
          headerBg: 'bg-amber-50',
          headerBorder: 'border-amber-200',
          badge: 'bg-amber-100 text-amber-700',
          indicator: 'bg-amber-500'
        };
      case 'bridge-crosser':
        return {
          headerBg: 'bg-blue-50',
          headerBorder: 'border-blue-200',
          badge: 'bg-blue-100 text-blue-700',
          indicator: 'bg-blue-500'
        };
      case 'teen-driver':
        return {
          headerBg: 'bg-purple-50',
          headerBorder: 'border-purple-200',
          badge: 'bg-purple-100 text-purple-700',
          indicator: 'bg-purple-500'
        };
      default:
        return {
          headerBg: 'bg-slate-50/50',
          headerBorder: 'border-slate-100',
          badge: '',
          indicator: ''
        };
    }
  };

  const getPriorityLabel = (priorityType: PrioritySegmentType) => {
    switch (priorityType) {
      case 'img-switcher': return 'IMG Switcher';
      case 'bridge-crosser': return 'Bridge Crosser';
      case 'teen-driver': return 'Teen Driver';
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      {/* Header */}
      <div className="grid grid-cols-5 bg-slate-100/80 rounded-t-xl border-x border-t border-slate-200 sticky top-0 z-20 overflow-hidden">
        {COLUMNS.map((col, i) => (
          <div key={i} className="p-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest border-r border-slate-200 last:border-0">
            {col}
          </div>
        ))}
      </div>

      {/* Rows */}
      <div className="border-x border-b border-slate-200 bg-white shadow-xl rounded-b-xl overflow-hidden">
        {personas.map((p) => {
          const styles = getPriorityStyles(p.priorityType);
          const priorityLabel = getPriorityLabel(p.priorityType);

          return (
            <div
              key={p.id}
              className="grid grid-cols-5 border-b border-slate-100 last:border-0"
              onMouseEnter={(e) => handleMouseEnter(p, e)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Persona Header */}
              <div className={`col-span-5 border-b ${styles.headerBorder} ${styles.headerBg} px-4 py-2 flex items-center gap-2`}>
                {p.priorityType && (
                  <span className={`w-2 h-2 rounded-full ${styles.indicator}`} />
                )}
                <span className="font-bold text-slate-900">{p.name}</span>
                {priorityLabel && (
                  <span className={`text-[10px] font-medium ${styles.badge} px-2 py-0.5 rounded-full`}>
                    {priorityLabel}
                  </span>
                )}
                {p.touchPoints && (
                  <span className="text-[10px] text-emerald-600 font-medium bg-emerald-100 px-2 py-0.5 rounded-full">
                    {p.touchPoints.length} Touch Points
                  </span>
                )}
              </div>
            
            {/* Data Columns */}
            {[0, 1, 2, 3, 4].map((colIdx) => {
              const isActive = activeCell.personaId === p.id && activeCell.colIndex === colIdx;
              const isOtherActive = isPanelOpen && !isActive;

              const handleClick = () => {
                if (colIdx === 0 && p.touchPoints) {
                  // Segment column opens touch point modal
                  onOpenTouchPointModal(p);
                } else {
                  onSelectCell(p, colIdx);
                }
              };

              return (
                <div
                  key={colIdx}
                  onClick={handleClick}
                  className={`
                    relative p-4 md:p-6 text-xs md:text-sm transition-all duration-300 cursor-pointer border-r border-slate-100 last:border-0 min-h-[100px] flex items-center
                    ${isActive ? 'bg-emerald-50 z-10 scale-[1.02] shadow-inner ring-1 ring-emerald-200' : 'hover:bg-slate-50'}
                    ${isOtherActive ? 'opacity-40 blur-[1px]' : 'opacity-100'}
                  `}
                >
                  <CellContent persona={p} colIndex={colIdx} />
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-r" />
                  )}
                </div>
              );
            })}
            </div>
          );
        })}
      </div>

      {/* Quick View Overlay */}
      <SegmentQuickView
        segmentType={quickViewSegment}
        isVisible={quickViewSegment !== null}
        position={quickViewPosition}
      />
    </div>
  );
};

const CellContent: React.FC<{ persona: Persona; colIndex: number }> = ({ persona, colIndex }) => {
  switch (colIndex) {
    case 0: 
      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Route className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-slate-900">Journey Map</span>
            {persona.touchPoints && (
              <span className="text-[9px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">{persona.touchPoints.length} steps</span>
            )}
          </div>
          <span className="text-xs text-slate-500 line-clamp-2">Click to explore touch points</span>
          <span className="text-[10px] text-slate-400">{persona.steps.length} campaign steps</span>
        </div>
      );
    case 1: 
      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Map className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-slate-900">Location</span>
          </div>
          <span className="text-slate-600 line-clamp-3">{persona.location.region}</span>
        </div>
      );
    case 2: 
      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-slate-900">Budget</span>
          </div>
          <span className="text-slate-600 line-clamp-3">{persona.spending.budgetRange}</span>
          <span className="text-[10px] text-slate-400">{persona.spending.ticketItems.length} ticket items</span>
        </div>
      );
    case 3: 
      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-slate-900">Competition</span>
          </div>
          <span className="text-slate-600 line-clamp-2">vs. {persona.competition.schools[0]?.name || 'N/A'}</span>
          <span className="text-[10px] text-slate-400">{persona.competition.schools.length} competitors</span>
        </div>
      );
    case 4: 
      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-slate-900">Value</span>
          </div>
          <span className="text-emerald-700 font-medium line-clamp-3">Strategic High Value</span>
          <span className="text-[10px] text-slate-400">{persona.touchPoints?.length || 0} touch points</span>
        </div>
      );
    default: 
      return null;
  }
};

export default MatrixGrid;

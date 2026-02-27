import React, { useState } from 'react';
import { Persona, COLUMNS, MatrixColumn, PrioritySegmentType } from '../types';
import { MapPin, DollarSign, Trophy, Zap, Route } from 'lucide-react';
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
}) => {
  const [quickViewSegment, setQuickViewSegment] = useState<{ personaId: string | null; colIndex: number | null }>({ personaId: null, colIndex: null });
  const [quickViewPosition, setQuickViewPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (persona: Persona, colIndex: number, e: React.MouseEvent) => {
    setQuickViewSegment({ personaId: persona.id, colIndex });
    setQuickViewPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setQuickViewSegment({ personaId: null, colIndex: null });
  };

  const getPriorityColor = (priorityType: PrioritySegmentType) => {
    switch (priorityType) {
      case 'img-switcher': return '#2D8F6F';
      case 'bridge-crosser': return '#0066ff';
      case 'teen-driver': return '#9933ff';
      default: return '#0a0a0a';
    }
  };

  const getPriorityLabel = (priorityType: PrioritySegmentType) => {
    switch (priorityType) {
      case 'img-switcher': return 'IMG SWITCHER';
      case 'bridge-crosser': return 'BRIDGE CROSSER';
      case 'teen-driver': return 'TEEN DRIVER';
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-6 bg-[#0a0a0a]" />
        <h2 className="te-heading">SEGMENT MATRIX</h2>
        <span className="te-label ml-auto">
          {personas.length} SEGMENTS
        </span>
      </div>

      {/* Table Header */}
      <div className="te-table-header">
        {COLUMNS.map((col, i) => (
          <div key={i}>{col}</div>
        ))}
      </div>

      {/* Rows */}
      <div className="border-2 border-[#0a0a0a] border-t-0">
        {personas.map((p, personaIndex) => {
          const priorityColor = getPriorityColor(p.priorityType);
          const priorityLabel = getPriorityLabel(p.priorityType);

          return (
            <div
              key={p.id}
              className="border-b border-[#0a0a0a] last:border-b-0"
            >
              {/* Persona Header Row */}
              <div
                className="flex items-center gap-3 px-4 py-2 bg-[#f0f0eb] border-b border-[#e5e5e0]"
                style={p.priorityType ? { borderLeft: `4px solid ${priorityColor}` } : {}}
              >
                <span className="te-micro te-muted">[{String(personaIndex + 1).padStart(2, '0')}]</span>
                <span className="te-body-bold uppercase">{p.name}</span>
                {priorityLabel && (
                  <span
                    className="te-micro px-2 py-0.5 text-white"
                    style={{ backgroundColor: priorityColor }}
                  >
                    {priorityLabel}
                  </span>
                )}
                {p.touchPoints && (
                  <span className="te-micro te-muted ml-auto">
                    {p.touchPoints.length} TOUCH POINTS
                  </span>
                )}
              </div>

              {/* Data Columns */}
              <div className="grid grid-cols-5">
                {[0, 1, 2, 3, 4].map((colIdx) => {
                  const isActive = activeCell.personaId === p.id && activeCell.colIndex === colIdx;
                  const isHovered = quickViewSegment.personaId === p.id && quickViewSegment.colIndex === colIdx;
                  const isOtherActive = isPanelOpen && !isActive;

                  const handleClick = () => {
                    onSelectCell(p, colIdx);
                  };

                  return (
                    <div
                      key={colIdx}
                      onClick={handleClick}
                      onMouseEnter={(e) => handleMouseEnter(p, colIdx, e)}
                      onMouseLeave={handleMouseLeave}
                      className={`
                        p-4 min-h-[80px] flex flex-col justify-center cursor-pointer
                        border-r border-[#e5e5e0] last:border-r-0 relative
                        transition-all duration-150
                        ${isActive ? 'bg-[#0a0a0a] text-white' : 'bg-white hover:bg-[#f5f5f0]'}
                        ${isHovered && !isActive ? 'shadow-[inset_0_0_0_2px_#2D8F6F] z-10' : ''}
                        ${isOtherActive ? 'opacity-30' : 'opacity-100'}
                      `}
                    >
                      <CellContent
                        persona={p}
                        colIndex={colIdx}
                        isActive={isActive}
                        priorityColor={p.priorityType ? priorityColor : undefined}
                      />
                      {isActive && (
                        <div
                          className="absolute left-0 top-0 bottom-0 w-1"
                          style={{ backgroundColor: priorityColor || '#2D8F6F' }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick View Overlay */}
      <SegmentQuickView
        segmentData={quickViewSegment}
        isVisible={quickViewSegment.personaId !== null}
        position={quickViewPosition}
      />
    </div>
  );
};

const CellContent: React.FC<{
  persona: Persona;
  colIndex: number;
  isActive: boolean;
  priorityColor?: string;
}> = ({ persona, colIndex, isActive, priorityColor }) => {
  const textColor = isActive ? 'text-white' : 'text-[#0a0a0a]';
  const mutedColor = isActive ? 'text-[#8a8a8a]' : 'text-[#4a4a4a]';
  const accentColor = priorityColor || (isActive ? '#2D8F6F' : '#0a0a0a');

  const getBudgetValue = (id: string) => {
    switch (id) {
      case 'corp': return '$250K - $600K+ income';
      case 'life': return '$180K - $400K+ income';
      case 'pivot': return '$120K - $300K+ income';
      case 'bridge': return '$90K - $200K income';
      case 'teen': return '$100K - $250K+ income';
      default: return persona.spending.budgetRange;
    }
  };

  const getAlignmentValue = (id: string) => {
    switch (id) {
      case 'corp': return 'Elite professional networks & Ivy legacy';
      case 'life': return 'Innovative energy & real-world mentors';
      case 'pivot': return 'Athletic excellence & recruitment visibility';
      case 'bridge': return 'Deep local roots & stable multi-year enrollment';
      case 'teen': return 'Authentic peer recruitment & social content';
      default: return 'Core strategic contribution';
    }
  };

  switch (colIndex) {
    case 0:
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <span className="te-display" style={{ color: isActive ? 'white' : accentColor }}>
            {persona.touchPoints?.length || 0}
          </span>
          <span className={`te-micro mt-1 ${isActive ? 'text-white/70' : 'te-muted'}`}>
            Touch Points
          </span>
        </div>
      );
    case 1:
      return (
        <div className="flex flex-col justify-center h-full">
          <span className={`te-body ${textColor}`}>
            {persona.location.region}
          </span>
        </div>
      );
    case 2:
      return (
        <div className="flex flex-col justify-center h-full">
          <span className={`te-body-bold uppercase ${textColor}`}>
            {getBudgetValue(persona.id)}
          </span>
        </div>
      );
    case 3:
      return (
        <div className="flex flex-col justify-center h-full gap-1">
          <span className={`te-body ${textColor}`}>
            vs. {persona.competition.schools[0]?.name || 'N/A'}
          </span>
          <span className={`te-micro ${mutedColor}`}>
            {persona.competition.schools.length} competitors
          </span>
        </div>
      );
    case 4:
      return (
        <div className="flex flex-col justify-center h-full">
          <span className={`te-body-bold uppercase`} style={{ color: isActive ? 'white' : accentColor }}>
            {getAlignmentValue(persona.id)}
          </span>
        </div>
      );
    default:
      return null;
  }
};

export default MatrixGrid;

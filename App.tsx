import React, { useState, useCallback } from 'react';
import { personas } from './data';
import { Persona, MatrixColumn, PrioritySegmentType } from './types';
import MatrixGrid from './components/MatrixGrid';
import DetailPanel from './components/DetailPanel';
import TouchPointModal from './components/TouchPointModal';
import ExecutiveDashboard from './components/ExecutiveDashboard';

const App: React.FC = () => {
  const [activeCell, setActiveCell] = useState<{ personaId: string | null; colIndex: MatrixColumn | null }>({
    personaId: null,
    colIndex: null,
  });
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedTactics, setSelectedTactics] = useState<Set<string>>(new Set());
  const [isTouchPointModalOpen, setIsTouchPointModalOpen] = useState(false);
  const [selectedPersonaForTouchPoints, setSelectedPersonaForTouchPoints] = useState<Persona | null>(null);

  const handleSelectCell = useCallback((persona: Persona, colIndex: MatrixColumn) => {
    setActiveCell({ personaId: persona.id, colIndex });
    setIsPanelOpen(true);
  }, []);

  const handleClosePanel = useCallback(() => {
    setIsPanelOpen(false);
    setTimeout(() => setActiveCell({ personaId: null, colIndex: null }), 500);
  }, []);

  const handleToggleTactic = useCallback((tacticId: string) => {
    setSelectedTactics(prev => {
      const next = new Set(prev);
      if (next.has(tacticId)) next.delete(tacticId);
      else next.add(tacticId);
      return next;
    });
  }, []);

  const handleNavigate = useCallback((direction: 'left' | 'right') => {
    if (activeCell.colIndex === null) return;

    let newColIndex = activeCell.colIndex;
    if (direction === 'left') {
      newColIndex = activeCell.colIndex > 0 ? activeCell.colIndex - 1 : 4;
    } else {
      newColIndex = activeCell.colIndex < 4 ? activeCell.colIndex + 1 : 0;
    }

    setActiveCell(prev => ({ ...prev, colIndex: newColIndex }));
  }, [activeCell]);

  const handleOpenTouchPointModal = useCallback((persona: Persona) => {
    setSelectedPersonaForTouchPoints(persona);
    setIsTouchPointModalOpen(true);
  }, []);

  const handleCloseTouchPointModal = useCallback(() => {
    setIsTouchPointModalOpen(false);
    setTimeout(() => setSelectedPersonaForTouchPoints(null), 300);
  }, []);

  const handleSegmentClick = useCallback((segment: PrioritySegmentType) => {
    // Find the persona with this priority type and open their detail panel
    const persona = personas.find(p => p.priorityType === segment);
    if (persona) {
      setActiveCell({ personaId: persona.id, colIndex: MatrixColumn.SEGMENT });
      setIsPanelOpen(true);
    }
  }, []);

  const selectedPersona = personas.find(p => p.id === activeCell.personaId);

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <header className="max-w-7xl mx-auto px-6 pt-16 pb-12 md:flex justify-between items-end border-b border-slate-200">
        <div className="mb-6 md:mb-0">
          <h1 className="text-5xl font-extralight text-slate-900 tracking-tight leading-none">
            SSES <span className="font-black text-emerald-600">GROWTH</span>
          </h1>
          <p className="text-slate-400 text-sm font-semibold tracking-[0.2em] mt-2 uppercase">
            Strategic Persona Intelligence Matrix 2026
          </p>
        </div>
        <div className="flex flex-col items-end">
          <div className="bg-emerald-600 text-white px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase mb-2">
            Confidential Strategy
          </div>
          <p className="text-xs text-slate-400 font-medium italic">
            Target Market: Sarasota & Tampa Relocation Corridors
          </p>
        </div>
      </header>

      {/* Executive Dashboard */}
      <ExecutiveDashboard onSegmentClick={handleSegmentClick} />

      {/* Main Grid */}
      <main>
        <MatrixGrid
          personas={personas}
          onSelectCell={handleSelectCell}
          activeCell={activeCell}
          isPanelOpen={isPanelOpen}
          onOpenTouchPointModal={handleOpenTouchPointModal}
        />
      </main>

      {/* Bottom Panel */}
      {selectedPersona && (
        <DetailPanel 
          persona={selectedPersona}
          colIndex={activeCell.colIndex ?? MatrixColumn.SEGMENT}
          isOpen={isPanelOpen}
          selectedTactics={selectedTactics}
          onToggleTactic={handleToggleTactic}
          onClose={handleClosePanel}
          onNavigate={handleNavigate}
          onOpenTouchPointModal={handleOpenTouchPointModal}
        />
      )}

      {/* Touch Point Modal */}
      {selectedPersonaForTouchPoints && (
        <TouchPointModal
          persona={selectedPersonaForTouchPoints}
          isOpen={isTouchPointModalOpen}
          onClose={handleCloseTouchPointModal}
        />
      )}

      {/* Footer Info */}
      <footer className="max-w-7xl mx-auto px-8 py-10 opacity-40 hover:opacity-100 transition-opacity">
        <p className="text-[10px] text-slate-500 uppercase tracking-widest text-center">
          Intelligence powered by regional research & high-net-worth relocation analysis. 
          Property of SSES Enrollment Marketing.
        </p>
      </footer>
    </div>
  );
};

export default App;

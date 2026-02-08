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
    const persona = personas.find(p => p.priorityType === segment);
    if (persona) {
      setActiveCell({ personaId: persona.id, colIndex: MatrixColumn.SEGMENT });
      setIsPanelOpen(true);
    }
  }, []);

  const selectedPersona = personas.find(p => p.id === activeCell.personaId);

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* TE-Style Header */}
      <header className="border-b-2 border-[#0a0a0a] bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Logo & Title */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#ff6b00] flex items-center justify-center">
                <span className="font-mono text-lg font-bold text-white">SSES</span>
              </div>
              <div>
                <h1 className="font-mono text-xl md:text-2xl font-bold tracking-tight">
                  GROWTH <span className="text-[#ff6b00]">MATRIX</span>
                </h1>
                <p className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-[0.2em]">
                  Strategic Persona Intelligence / 2026
                </p>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#00cc66] animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#8a8a8a]">Live Data</span>
              </div>
              <div className="px-3 py-1.5 border border-[#ff6b00] text-[#ff6b00] font-mono text-[10px] uppercase tracking-wider">
                Confidential
              </div>
              <div className="hidden md:block font-mono text-[10px] text-[#8a8a8a]">
                Tampa Bay / Sarasota Region
              </div>
            </div>
          </div>
        </div>

        {/* Sub-header with version */}
        <div className="border-t border-[#2a2a2a] px-4 md:px-6 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] text-[#8a8a8a]">VER. 2.0.0</span>
              <span className="font-mono text-[10px] text-[#8a8a8a]">|</span>
              <span className="font-mono text-[10px] text-[#8a8a8a]">5 SEGMENTS</span>
              <span className="font-mono text-[10px] text-[#8a8a8a]">|</span>
              <span className="font-mono text-[10px] text-[#8a8a8a]">3 PRIORITY</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-[#8a8a8a]">
                {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase()}
              </span>
            </div>
          </div>
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

      {/* TE-Style Footer */}
      <footer className="border-t-2 border-[#0a0a0a] bg-[#0a0a0a] text-white mt-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] text-[#8a8a8a] uppercase tracking-wider">
                SSES Enrollment Marketing
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] text-[#8a8a8a]">
                Powered by Regional Research & HNW Analysis
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

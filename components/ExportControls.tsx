import React, { useState } from 'react';
import { Printer, Download, FileText } from 'lucide-react';

const ExportControls: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    setIsExporting(true);
    // Generate a simple text export of the key metrics
    const exportData = `
SSES Strategic Growth Matrix - Executive Summary
================================================

Generated: ${new Date().toLocaleDateString()}

KEY METRICS
-----------
K-8 Pipeline: 680-850 families/year
IMG Transfers: 195-260 students/year (2020-2024)
SSES Captures: 80-105 students/year
Teen Veto Influence: 60%+ of parent decisions

PRIORITY SEGMENTS
-----------------
1. IMG Switcher (Strategic Pivot)
   - 195-260 annual transfers from IMG Academy
   - Reasons: Financial 44%, Athletic 22%, Academic 19%, Relocation 14%
   - SSES Advantage: $66,255 tuition savings vs IMG ($91K)

2. Bridge Crosser (Local K-8 Transition)
   - 680-850 annual K-8 graduates
   - School types: Montessori 40%, Religious 32%, Other Private 20%
   - Budget segments: Mid-budget dominates at 50%

3. Teen Driver (Student Advocate)
   - 60%+ veto power on parent decisions
   - Discovery: Instagram, TikTok, YouTube, Peer referrals
   - Key factors: Campus aesthetic, Food quality, Social culture

COMPETITIVE ADVANTAGES
----------------------
- Tuition: $24,745 vs IMG $91,000
- 12-hour response guarantee
- Flexible training windows (11am-2pm)
- FHSAA eligibility maintained
- 9:1 student-teacher ratio

================================================
Confidential Strategy Document
Property of SSES Enrollment Marketing
    `.trim();

    // Create and trigger download
    const blob = new Blob([exportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SSES-Growth-Matrix-Export-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setTimeout(() => setIsExporting(false), 1000);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handlePrint}
        className="
          flex items-center gap-2 px-4 py-2 rounded-xl
          bg-white border border-slate-200 text-slate-600
          hover:bg-slate-50 hover:border-slate-300
          transition-all duration-200
          text-sm font-medium
        "
      >
        <Printer className="w-4 h-4" />
        <span className="hidden sm:inline">Print</span>
      </button>

      <button
        onClick={handleExport}
        disabled={isExporting}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-xl
          transition-all duration-200
          text-sm font-medium
          ${isExporting
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg'
          }
        `}
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">
          {isExporting ? 'Exporting...' : 'Export'}
        </span>
      </button>
    </div>
  );
};

export default ExportControls;

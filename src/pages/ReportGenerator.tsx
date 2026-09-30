import { useState } from 'react';
import { FileText, Sparkles, Loader2, Download, FileSpreadsheet, Printer, Check, FileBarChart } from 'lucide-react';
import { reportSections, generateReportContent, reportOptions } from '@/data/mockData';

export function ReportGenerator() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(reportOptions);
  const [generating, setGenerating] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const generate = () => {
    setGenerating(true);
    setReport(null);
    setTimeout(() => {
      const content = generateReportContent(selectedOptions);
      setReport(content);
      setGenerating(false);
    }, 2500);
  };

  const handlePrint = () => {
    if (report) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`<pre style="font-family: 'JetBrains Mono', monospace; padding: 40px; white-space: pre-wrap; color: #e5e7eb; background: #0a0e1a;">${report}</pre>`);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const handleExportCSV = () => {
    if (!report) return;
    const csvLines = [
      ['Section', 'Content'],
      ...report.split('\n\n---\n\n').map((section) => {
        const lines = section.split('\n');
        const title = lines[0] || '';
        const content = lines.slice(1).join(' ').replace(/"/g, '""');
        return [title, content];
      }),
    ];
    const csv = csvLines.map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'security-report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    if (!report) return;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html><head><title>Security Assessment Report</title>
        <style>
          body { font-family: 'Inter', sans-serif; padding: 40px; color: #1a2336; line-height: 1.6; }
          pre { white-space: pre-wrap; font-family: 'JetBrains Mono', monospace; font-size: 12px; }
          h1 { color: #0891b2; }
        </style></head>
        <body><h1>AI Security Assessment Report</h1><pre>${report}</pre></body></html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white">AI Security Report Generator</h2>
        <p className="text-sm text-gray-500 mt-1">Generate professional security assessment reports with AI</p>
      </div>

      {/* Report options */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-5">
          <FileBarChart className="w-5 h-5 text-primary-400" />
          <h3 className="text-sm font-semibold text-white">Report Sections</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {reportOptions.map((option) => {
            const active = selectedOptions.includes(option);
            return (
              <button
                key={option}
                onClick={() => toggleOption(option)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${active ? 'bg-primary-600/15 text-primary-300 border border-primary-600/40' : 'bg-base-700/40 text-gray-400 border border-base-600/60 hover:bg-base-700/60'}`}
              >
                <div className={`flex items-center justify-center w-5 h-5 rounded-md ${active ? 'bg-primary-600' : 'bg-base-600'} shrink-0`}>
                  {active && <Check className="w-3 h-3 text-white" />}
                </div>
                {option}
              </button>
            );
          })}
        </div>
        <button
          onClick={generate}
          disabled={selectedOptions.length === 0 || generating}
          className="btn-primary mt-5 px-6 py-3 flex items-center gap-2 text-sm disabled:opacity-50"
        >
          {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {generating ? 'Generating Report...' : 'Generate Report'}
        </button>
      </div>

      {/* Report structure preview */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Report Structure</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {reportSections.map((section, i) => (
            <div key={section.id} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-base-700/40">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary-600/15 text-primary-400 text-xs font-semibold shrink-0">
                {i + 1}
              </span>
              <span className="text-sm text-gray-300">{section.title}</span>
              {section.included && selectedOptions.includes(
                section.title === 'Executive Summary' ? 'Executive Summary' :
                section.title === 'Findings' ? 'Technical Findings' :
                section.title === 'Risk Assessment' ? 'Risk Assessment' :
                section.title === 'Evidence' ? 'Evidence' :
                section.title === 'Recommendations' ? 'Remediation' :
                section.title === 'Retesting' ? 'Retest Results' : section.title
  ) && (
                <Check className="w-4 h-4 text-success-400 ml-auto" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Generated report */}
      {generating && (
        <div className="glass-card p-8 flex flex-col items-center justify-center">
          <Loader2 className="w-10 h-10 text-primary-400 animate-spin mb-3" />
          <p className="text-sm text-gray-400">AI is generating your security assessment report...</p>
          <p className="text-xs text-gray-600 mt-1">Analyzing findings, risk levels, and remediation data</p>
        </div>
      )}

      {report && !generating && (
        <div className="glass-card overflow-hidden animate-slide-up">
          <div className="px-6 py-4 border-b border-base-600/60 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary-400" />
              <h3 className="text-sm font-semibold text-white">Generated Report</h3>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleExportPDF} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-error-400 hover:bg-error-500/10 border border-error-500/30 transition-all duration-200">
                <Download className="w-3.5 h-3.5" /> Export PDF
              </button>
              <button onClick={handleExportCSV} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-success-400 hover:bg-success-500/10 border border-success-500/30 transition-all duration-200">
                <FileSpreadsheet className="w-3.5 h-3.5" /> Export CSV
              </button>
              <button onClick={handlePrint} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-primary-400 hover:bg-primary-500/10 border border-primary-500/30 transition-all duration-200">
                <Printer className="w-3.5 h-3.5" /> Print
              </button>
            </div>
          </div>
          <div className="p-6 max-h-[600px] overflow-y-auto">
            <pre className="text-xs font-mono text-gray-300 whitespace-pre-wrap leading-relaxed">{report}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
